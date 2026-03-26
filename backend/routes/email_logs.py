"""
Email Logs API Routes - Track all sent emails with open/click tracking
"""
from fastapi import APIRouter, HTTPException, Query, Response
from fastapi.responses import RedirectResponse
from typing import List, Optional
from datetime import datetime, timezone, timedelta
from pydantic import BaseModel
import logging
import uuid
import json
import base64

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/email-logs", tags=["email-logs"])

# Supabase client - will be set by main app
supabase = None

def set_supabase_client(client):
    """Set the Supabase client"""
    global supabase
    supabase = client
    logger.info("✅ Supabase client set for email logs route")


# 1x1 transparent GIF for tracking pixel
TRACKING_PIXEL = base64.b64decode(
    "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
)


class EmailLogCreate(BaseModel):
    to_email: str
    subject: str
    email_type: str  # order_confirmation, review_request, marketing, contact_form, checkout_started, etc.
    status: str = "sent"  # sent, failed, bounced
    order_id: Optional[str] = None
    customer_name: Optional[str] = None
    metadata: Optional[dict] = None


class EmailLogResponse(BaseModel):
    id: str
    to_email: str
    subject: str
    email_type: str
    status: str
    order_id: Optional[str] = None
    customer_name: Optional[str] = None
    metadata: Optional[dict] = None
    created_at: str


async def log_email(
    to_email: str,
    subject: str,
    email_type: str,
    status: str = "sent",
    order_id: str = None,
    customer_name: str = None,
    metadata: dict = None
) -> bool:
    """Log an email to the database"""
    global supabase
    
    if not supabase:
        logger.warning("Supabase not configured, skipping email log")
        return False
    
    try:
        log_data = {
            "id": str(uuid.uuid4()),
            "to_email": to_email,
            "subject": subject,
            "email_type": email_type,
            "status": status,
            "order_id": order_id,
            "customer_name": customer_name,
            "metadata": json.dumps(metadata) if metadata else None,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        
        result = supabase.table("email_logs").insert(log_data).execute()
        logger.info(f"📧 Email logged: {email_type} to {to_email}")
        return True
    except Exception as e:
        logger.error(f"Failed to log email: {e}")
        return False


@router.get("/")
async def get_email_logs(
    email_type: Optional[str] = None,
    status: Optional[str] = None,
    days: int = Query(default=30, le=365),
    limit: int = Query(default=100, le=1000),
    offset: int = 0
):
    """Get email logs with optional filters"""
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not configured")
    
    try:
        cutoff = (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()
        
        query = supabase.table("email_logs").select("*").gte("created_at", cutoff)
        
        if email_type:
            query = query.eq("email_type", email_type)
        if status:
            query = query.eq("status", status)
        
        query = query.order("created_at", desc=True).range(offset, offset + limit - 1)
        result = query.execute()
        
        logs = []
        for log in result.data or []:
            # Parse metadata JSON
            metadata = log.get("metadata")
            if isinstance(metadata, str):
                try:
                    metadata = json.loads(metadata)
                except:
                    metadata = None
            
            logs.append({
                "id": log.get("id"),
                "to_email": log.get("to_email"),
                "subject": log.get("subject"),
                "email_type": log.get("email_type"),
                "status": log.get("status"),
                "order_id": log.get("order_id"),
                "customer_name": log.get("customer_name"),
                "metadata": metadata,
                "created_at": log.get("created_at")
            })
        
        return {
            "logs": logs,
            "total": len(logs),
            "offset": offset,
            "limit": limit
        }
    except Exception as e:
        logger.error(f"Error fetching email logs: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stats")
async def get_email_stats(days: int = Query(default=30, le=365)):
    """Get email statistics including opens and clicks"""
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not configured")
    
    try:
        cutoff = (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()
        
        # Get all logs for period
        result = supabase.table("email_logs").select("*").gte("created_at", cutoff).execute()
        logs = result.data or []
        
        # Calculate stats
        total = len(logs)
        sent = len([l for l in logs if l.get("status") == "sent"])
        failed = len([l for l in logs if l.get("status") == "failed"])
        
        # Calculate opens and clicks
        total_opens = sum(l.get("opens", 0) or 0 for l in logs)
        total_clicks = sum(l.get("clicks", 0) or 0 for l in logs)
        emails_opened = len([l for l in logs if (l.get("opens", 0) or 0) > 0])
        emails_clicked = len([l for l in logs if (l.get("clicks", 0) or 0) > 0])
        
        # Calculate rates (only for sent emails)
        open_rate = round(emails_opened / sent * 100, 1) if sent > 0 else 0
        click_rate = round(emails_clicked / sent * 100, 1) if sent > 0 else 0
        
        # Group by type
        by_type = {}
        for log in logs:
            t = log.get("email_type", "unknown")
            by_type[t] = by_type.get(t, 0) + 1
        
        # Group by day for chart
        by_day = {}
        for log in logs:
            day = log.get("created_at", "")[:10]
            by_day[day] = by_day.get(day, 0) + 1
        
        # Recent emails
        recent = sorted(logs, key=lambda x: x.get("created_at", ""), reverse=True)[:10]
        
        return {
            "total_emails": total,
            "sent": sent,
            "failed": failed,
            "success_rate": round(sent / total * 100, 1) if total > 0 else 0,
            "total_opens": total_opens,
            "total_clicks": total_clicks,
            "emails_opened": emails_opened,
            "emails_clicked": emails_clicked,
            "open_rate": open_rate,
            "click_rate": click_rate,
            "by_type": by_type,
            "by_day": by_day,
            "recent": recent,
            "period_days": days
        }
    except Exception as e:
        logger.error(f"Error fetching email stats: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/types")
async def get_email_types():
    """Get list of email types"""
    return {
        "types": [
            {"id": "order_confirmation", "label": "Bevestigingsmail", "icon": "📦"},
            {"id": "review_request", "label": "Review verzoek", "icon": "⭐"},
            {"id": "abandoned_cart", "label": "Verlaten winkelwagen", "icon": "🛒"},
            {"id": "marketing", "label": "Marketing campagne", "icon": "📣"},
            {"id": "contact_form", "label": "Contactformulier", "icon": "📬"},
            {"id": "checkout_started", "label": "Checkout gestart", "icon": "💳"},
            {"id": "payment_success", "label": "Betaling geslaagd", "icon": "✅"},
            {"id": "payment_failed", "label": "Betaling mislukt", "icon": "❌"},
            {"id": "shipping_notification", "label": "Verzendnotificatie", "icon": "🚚"},
            {"id": "gift_card", "label": "Cadeaubon", "icon": "🎁"},
        ]
    }


# ============== EMAIL TRACKING ==============

@router.get("/track/open/{email_id}")
async def track_email_open(email_id: str):
    """Track email open via invisible pixel - returns 1x1 transparent GIF"""
    global supabase
    
    if supabase:
        try:
            # Update opens count
            result = supabase.table("email_logs").select("opens").eq("id", email_id).limit(1).execute()
            if result.data:
                current_opens = result.data[0].get("opens", 0) or 0
                supabase.table("email_logs").update({
                    "opens": current_opens + 1,
                    "last_opened_at": datetime.now(timezone.utc).isoformat()
                }).eq("id", email_id).execute()
                logger.info(f"📧 Email opened: {email_id}")
        except Exception as e:
            logger.warning(f"Failed to track email open: {e}")
    
    # Return transparent 1x1 GIF
    return Response(
        content=TRACKING_PIXEL,
        media_type="image/gif",
        headers={
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0"
        }
    )


@router.get("/track/click/{email_id}")
async def track_email_click(email_id: str, url: str = "https://droomvriendjes.nl"):
    """Track email click and redirect to destination URL"""
    global supabase
    
    if supabase:
        try:
            # Update clicks count
            result = supabase.table("email_logs").select("clicks").eq("id", email_id).limit(1).execute()
            if result.data:
                current_clicks = result.data[0].get("clicks", 0) or 0
                supabase.table("email_logs").update({
                    "clicks": current_clicks + 1,
                    "last_clicked_at": datetime.now(timezone.utc).isoformat()
                }).eq("id", email_id).execute()
                logger.info(f"📧 Email clicked: {email_id} -> {url}")
        except Exception as e:
            logger.warning(f"Failed to track email click: {e}")
    
    # Redirect to destination
    return RedirectResponse(url=url, status_code=302)


def get_tracking_pixel_url(email_id: str, base_url: str = "https://droomvriendjes.nl") -> str:
    """Generate tracking pixel URL for an email"""
    return f"{base_url}/api/email-logs/track/open/{email_id}"


def get_tracking_link(email_id: str, destination_url: str, base_url: str = "https://droomvriendjes.nl") -> str:
    """Generate tracked link URL for an email"""
    import urllib.parse
    encoded_url = urllib.parse.quote(destination_url, safe='')
    return f"{base_url}/api/email-logs/track/click/{email_id}?url={encoded_url}"
