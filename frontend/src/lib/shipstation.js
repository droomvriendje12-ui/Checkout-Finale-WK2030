/**
 * ShipStation Fulfillment Integration - Frontend Client
 *
 * All ShipStation API calls are proxied through the backend so that
 * SHIPSTATION_API_KEY and SHIPSTATION_API_SECRET never reach the browser.
 *
 * Environment variables required (backend):
 *   SHIPSTATION_API_KEY     - ShipStation API key
 *   SHIPSTATION_API_SECRET  - ShipStation API secret
 *   SHIPSTATION_ACCOUNT_ID  - ShipStation account / store ID
 */

const API_BASE = '/api';

/**
 * Sync a paid order to ShipStation for fulfillment.
 * Called automatically after a successful Mollie payment webhook.
 *
 * @param {string} orderId - Internal order UUID
 * @returns {Promise<{
 *   success: boolean,
 *   shipstation_order_id?: number,
 *   shipstation_order_number?: string,
 *   message?: string
 * }>}
 */
export async function syncOrderToShipStation(orderId) {
  const response = await fetch(`${API_BASE}/fulfillment/shipstation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order_id: orderId, action: 'sync' }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `ShipStation sync failed (${response.status})`);
  }

  return response.json();
}

/**
 * Create a shipment / label for an order in ShipStation.
 *
 * @param {string} orderId        - Internal order UUID
 * @param {Object} [shipmentData] - Optional overrides (carrier, service, etc.)
 * @returns {Promise<{
 *   success: boolean,
 *   tracking_number?: string,
 *   label_url?: string,
 *   carrier?: string,
 *   service?: string
 * }>}
 */
export async function createShipment(orderId, shipmentData = {}) {
  const response = await fetch(`${API_BASE}/fulfillment/shipstation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      order_id: orderId,
      action: 'create_shipment',
      ...shipmentData,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `Shipment creation failed (${response.status})`);
  }

  return response.json();
}

/**
 * Get the current fulfillment / shipment status for an order.
 *
 * @param {string} orderId - Internal order UUID
 * @returns {Promise<{
 *   order_id: string,
 *   shipstation_order_id?: number,
 *   shipstation_status?: string,
 *   tracking_number?: string,
 *   tracking_url?: string,
 *   carrier?: string,
 *   shipped_at?: string
 * }>}
 */
export async function getShipmentStatus(orderId) {
  const response = await fetch(
    `${API_BASE}/fulfillment/shipstation?order_id=${encodeURIComponent(orderId)}`
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `Could not fetch shipment status (${response.status})`);
  }

  return response.json();
}

/**
 * ShipStation order status labels for display in the admin UI.
 */
export const SHIPSTATION_STATUSES = {
  awaiting_payment: { label: 'Wacht op betaling', color: 'yellow' },
  awaiting_shipment: { label: 'Klaar voor verzending', color: 'blue' },
  shipped: { label: 'Verzonden', color: 'green' },
  on_hold: { label: 'In de wacht', color: 'orange' },
  cancelled: { label: 'Geannuleerd', color: 'red' },
};
