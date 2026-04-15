"""
ShipStation Fulfillment API Routes

Handles order syncing, shipment creation, status polling, and inbound
webhooks from ShipStation.

Environment variables required:
    SHIPSTATION_API_KEY     - ShipStation API key
    SHIPSTATION_API_SECRET  - ShipStation API secret
    SHIPSTATION_ACCOUNT_ID  - ShipStation store / account ID (optional)
"""

from fastapi import APIRouter, HTTPException, Request, Query
from pydantic import BaseModel
from typing import Optional
import logging
import os
import base64
import httpx
from datetime import datetime, timezone

logger = logging.getLogger(__name__)

router = APIRouter(tags=["fulfillment"])

# ── Supabase client injected by main app ──────────────────────────────────────
supabase = None


def set_supabase_client(client):
    """Inject the shared Supabase client."""
    global supabase
    supabase = client
    logger.info("✅ Supabase client set for ShipStation route")


# ── ShipStation API helpers ───────────────────────────────────────────────────

SHIPSTATION_API_BASE = "https://ssapi.shipstation.com"


def _get_auth_header() -> str:
    """Build the Basic-Auth header value from environment credentials."""
    api_key = os.environ.get("SHIPSTATION_API_KEY", "").strip()
    api_secret = os.environ.get("SHIPSTATION_API_SECRET", "").strip()
    if not api_key or not api_secret:
        raise ValueError(
            "SHIPSTATION_API_KEY and SHIPSTATION_API_SECRET must be configured"
        )
    token = base64.b64encode(f"{api_key}:{api_secret}".encode()).decode()
    return f"Basic {token}"


def _shipstation_configured() -> bool:
    return bool(
        os.environ.get("SHIPSTATION_API_KEY", "").strip()
        and os.environ.get("SHIPSTATION_API_SECRET", "").strip()
    )


async def _ss_request(method: str, path: str, **kwargs) -> dict:
    """Make an authenticated request to the ShipStation REST API."""
    headers = {
        "Authorization": _get_auth_header(),
        "Content-Type": "application/json",
    }
    url = f"{SHIPSTATION_API_BASE}{path}"
    timeout = float(os.environ.get("SHIPSTATION_TIMEOUT_SECONDS", "15"))

    async with httpx.AsyncClient(timeout=timeout) as client:
        response = await client.request(method, url, headers=headers, **kwargs)

    if response.status_code >= 400:
        logger.error(
            f"ShipStation API error {response.status_code}: {response.text[:500]}"
        )
        raise HTTPException(
            status_code=502,
            detail=f"ShipStation API returned {response.status_code}: {response.text[:200]}",
        )

    return response.json()


def _build_ss_order(order: dict, items: list) -> dict:
    """
    Convert an internal Droomvriendjes order to the ShipStation order payload.
    https://www.shipstation.com/docs/api/orders/create-update-order/
    """
    account_id = os.environ.get("SHIPSTATION_ACCOUNT_ID", "").strip()

    # Split customer name
    name_parts = (order.get("customer_name") or "").split(" ", 1)
    first_name = name_parts[0] if name_parts else ""
    last_name = name_parts[1] if len(name_parts) > 1 else ""

    ss_items = []
    for item in items:
        ss_items.append(
            {
                "lineItemKey": item.get("id", ""),
                "sku": item.get("product_sku", ""),
                "name": item.get("product_name", "Product"),
                "quantity": item.get("quantity", 1),
                "unitPrice": float(item.get("unit_price", 0)),
                "taxAmount": 0,
                "shippingAmount": 0,
                "options": [],
            }
        )

    payload = {
        "orderNumber": order.get("order_number", order.get("id", "")[:8].upper()),
        "orderKey": order.get("id", ""),
        "orderDate": order.get("created_at", datetime.now(timezone.utc).isoformat()),
        "orderStatus": "awaiting_shipment",
        "customerEmail": order.get("customer_email", ""),
        "billTo": {
            "name": order.get("customer_name", ""),
            "company": None,
            "street1": order.get("shipping_address", ""),
            "street2": None,
            "city": order.get("shipping_city", ""),
            "state": None,
            "postalCode": order.get("shipping_zipcode", ""),
            "country": "NL",
            "phone": order.get("customer_phone", ""),
            "residential": True,
        },
        "shipTo": {
            "name": order.get("customer_name", ""),
            "company": None,
            "street1": order.get("shipping_address", ""),
            "street2": None,
            "city": order.get("shipping_city", ""),
            "state": None,
            "postalCode": order.get("shipping_zipcode", ""),
            "country": "NL",
            "phone": order.get("customer_phone", ""),
            "residential": True,
        },
        "items": ss_items,
        "amountPaid": float(order.get("total_amount", 0)),
        "taxAmount": 0,
        "shippingAmount": 0,
        "customerNotes": order.get("customer_notes", ""),
        "internalNotes": f"Droomvriendjes order {order.get('id', '')}",
        "gift": bool(order.get("gift_wrap", False)),
        "paymentMethod": order.get("payment_method", "ideal"),
        "requestedShippingService": "PostNL",
        "carrierCode": "postnl",
        "serviceCode": "postnl_standard",
        "packageCode": "package",
        "confirmation": "none",
        "shipDate": None,
        "weight": {
            "value": len(ss_items) * 500,  # ~500g per item
            "units": "grams",
        },
    }

    if account_id:
        payload["advancedOptions"] = {"storeId": int(account_id)}

    return payload


# ── Pydantic models ───────────────────────────────────────────────────────────


class FulfillmentRequest(BaseModel):
    order_id: str
    action: str = "sync"  # 'sync' | 'create_shipment'
    carrier_code: Optional[str] = None
    service_code: Optional[str] = None
    package_code: Optional[str] = None


# ── API endpoints ─────────────────────────────────────────────────────────────


@router.post("/fulfillment/shipstation")
async def fulfillment_action(req: FulfillmentRequest):
    """
    POST /api/fulfillment/shipstation

    Actions:
      sync            - Create or update the order in ShipStation
      create_shipment - Create a shipping label for the order
    """
    if supabase is None:
        raise HTTPException(status_code=500, detail="Database not configured")

    if not _shipstation_configured():
        logger.warning("ShipStation credentials not configured – skipping fulfillment")
        return {
            "success": False,
            "message": "ShipStation not configured (SHIPSTATION_API_KEY / SHIPSTATION_API_SECRET missing)",
        }

    # Fetch order from Supabase
    order_result = (
        supabase.table("orders").select("*").eq("id", req.order_id).limit(1).execute()
    )
    if not order_result.data:
        raise HTTPException(status_code=404, detail="Order not found")
    order = order_result.data[0]

    items_result = (
        supabase.table("order_items")
        .select("*")
        .eq("order_id", req.order_id)
        .execute()
    )
    items = items_result.data or []

    # ── Sync order ────────────────────────────────────────────────────────────
    if req.action == "sync":
        try:
            ss_payload = _build_ss_order(order, items)
            ss_response = await _ss_request("POST", "/orders/createorder", json=ss_payload)

            ss_order_id = ss_response.get("orderId")
            ss_order_number = ss_response.get("orderNumber")

            # Persist ShipStation IDs back to Supabase
            supabase.table("orders").update(
                {
                    "shipstation_order_id": str(ss_order_id) if ss_order_id else None,
                    "updated_at": datetime.now(timezone.utc).isoformat(),
                }
            ).eq("id", req.order_id).execute()

            logger.info(
                f"✅ Order {req.order_id} synced to ShipStation: SS#{ss_order_id}"
            )
            return {
                "success": True,
                "shipstation_order_id": ss_order_id,
                "shipstation_order_number": ss_order_number,
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"ShipStation sync error for order {req.order_id}: {e}")
            raise HTTPException(
                status_code=500, detail=f"ShipStation sync failed: {str(e)}"
            )

    # ── Create shipment / label ───────────────────────────────────────────────
    elif req.action == "create_shipment":
        try:
            ss_order_id = order.get("shipstation_order_id")
            if not ss_order_id:
                # Sync first if not yet in ShipStation
                ss_payload = _build_ss_order(order, items)
                ss_sync = await _ss_request("POST", "/orders/createorder", json=ss_payload)
                ss_order_id = ss_sync.get("orderId")

            label_payload = {
                "orderId": int(ss_order_id),
                "carrierCode": req.carrier_code or "postnl",
                "serviceCode": req.service_code or "postnl_standard",
                "packageCode": req.package_code or "package",
                "confirmation": "none",
                "shipDate": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
                "weight": {
                    "value": len(items) * 500,
                    "units": "grams",
                },
                "testLabel": os.environ.get("SHIPSTATION_TEST_LABELS", "false").lower()
                == "true",
            }

            label_response = await _ss_request(
                "POST", "/shipments/createlabel", json=label_payload
            )

            tracking_number = label_response.get("trackingNumber", "")
            label_url = label_response.get("labelData", "")  # base64 PDF

            # Update order with tracking info
            supabase.table("orders").update(
                {
                    "tracking_number": tracking_number,
                    "status": "shipped",
                    "shipped_at": datetime.now(timezone.utc).isoformat(),
                    "updated_at": datetime.now(timezone.utc).isoformat(),
                }
            ).eq("id", req.order_id).execute()

            logger.info(
                f"✅ Shipment label created for order {req.order_id}: {tracking_number}"
            )
            return {
                "success": True,
                "tracking_number": tracking_number,
                "label_url": label_url,
                "carrier": req.carrier_code or "postnl",
                "service": req.service_code or "postnl_standard",
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.error(
                f"ShipStation create_shipment error for order {req.order_id}: {e}"
            )
            raise HTTPException(
                status_code=500, detail=f"Shipment creation failed: {str(e)}"
            )

    else:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown action '{req.action}'. Use 'sync' or 'create_shipment'.",
        )


@router.get("/fulfillment/shipstation")
async def get_shipment_status(order_id: str = Query(..., description="Internal order UUID")):
    """
    GET /api/fulfillment/shipstation?order_id=<uuid>

    Returns the current ShipStation fulfillment status for an order.
    """
    if supabase is None:
        raise HTTPException(status_code=500, detail="Database not configured")

    order_result = (
        supabase.table("orders").select("*").eq("id", order_id).limit(1).execute()
    )
    if not order_result.data:
        raise HTTPException(status_code=404, detail="Order not found")

    order = order_result.data[0]
    ss_order_id = order.get("shipstation_order_id")

    result = {
        "order_id": order_id,
        "shipstation_order_id": ss_order_id,
        "tracking_number": order.get("tracking_number"),
        "status": order.get("status"),
        "shipped_at": order.get("shipped_at"),
    }

    # If we have a ShipStation order ID and credentials, fetch live status
    if ss_order_id and _shipstation_configured():
        try:
            ss_order = await _ss_request("GET", f"/orders/{ss_order_id}")
            result["shipstation_status"] = ss_order.get("orderStatus")
            result["carrier"] = ss_order.get("carrierCode")
            result["service"] = ss_order.get("serviceCode")
        except Exception as e:
            logger.warning(f"Could not fetch live ShipStation status: {e}")

    return result


@router.post("/webhook/shipstation")
async def shipstation_webhook(request: Request):
    """
    POST /api/webhook/shipstation

    Receives inbound webhook notifications from ShipStation.
    ShipStation sends a JSON body with resource_type and resource_url.
    https://www.shipstation.com/docs/api/webhooks/
    """
    if supabase is None:
        return {"status": "error", "message": "Database not configured"}

    try:
        body = await request.json()
        resource_type = body.get("resource_type", "")
        resource_url = body.get("resource_url", "")

        logger.info(f"ShipStation webhook received: {resource_type} – {resource_url}")

        # SHIP_NOTIFY: order has been shipped, tracking number available
        if resource_type == "SHIP_NOTIFY" and resource_url and _shipstation_configured():
            try:
                shipment_data = await _ss_request("GET", resource_url.replace(SHIPSTATION_API_BASE, ""))
                shipments = shipment_data.get("shipments", [shipment_data])

                for shipment in shipments:
                    order_key = shipment.get("orderKey", "")  # our internal order UUID
                    tracking_number = shipment.get("trackingNumber", "")
                    carrier_code = shipment.get("carrierCode", "postnl")

                    if order_key and tracking_number:
                        supabase.table("orders").update(
                            {
                                "tracking_number": tracking_number,
                                "status": "shipped",
                                "shipped_at": datetime.now(timezone.utc).isoformat(),
                                "updated_at": datetime.now(timezone.utc).isoformat(),
                            }
                        ).eq("id", order_key).execute()

                        logger.info(
                            f"✅ Order {order_key} marked shipped via ShipStation webhook: {tracking_number}"
                        )

            except Exception as e:
                logger.error(f"Error processing ShipStation SHIP_NOTIFY: {e}")

        return {"status": "ok", "resource_type": resource_type}

    except Exception as e:
        logger.error(f"ShipStation webhook error: {e}")
        return {"status": "error", "message": str(e)}
