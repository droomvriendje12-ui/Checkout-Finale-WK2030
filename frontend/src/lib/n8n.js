/**
 * n8n Email Workflow Integration - Frontend Client
 *
 * Triggers n8n automation workflows via the backend proxy so that
 * the N8N_WEBHOOK_URL and N8N_API_KEY never leave the server.
 *
 * Environment variables required (backend):
 *   N8N_WEBHOOK_URL    - Full URL of the n8n webhook trigger endpoint
 *   N8N_API_KEY        - Optional API key sent as X-N8N-API-KEY header
 *   N8N_WEBHOOK_SECRET - Optional shared secret sent as X-N8N-SECRET header
 *
 * Supported template IDs (must match workflows configured in n8n):
 *   order-confirmation      - Sent immediately after successful payment
 *   shipping-notification   - Sent when a tracking code is added
 *   payment-receipt         - Detailed payment receipt with line items
 *   abandoned-cart          - Triggered for incomplete checkouts
 *   welcome                 - New subscriber welcome series
 */

const API_BASE = '/api';

/**
 * Trigger an n8n email workflow via the backend.
 *
 * @param {string} templateId  - Workflow identifier (see list above)
 * @param {Object} payload     - Template variables forwarded to n8n
 * @param {string} payload.email          - Recipient email address
 * @param {string} [payload.name]         - Recipient display name
 * @param {string} [payload.orderId]      - Related order ID
 * @param {Object} [payload.orderData]    - Full order object for rich templates
 * @param {Array}  [payload.items]        - Order line items
 * @param {string} [payload.trackingCode] - Shipment tracking code
 * @param {string} [payload.trackingUrl]  - Full tracking URL
 * @returns {Promise<{delivered: boolean, status_code?: number, reason?: string}>}
 */
export async function sendEmailViaWorkflow(templateId, payload) {
  if (!templateId || !payload?.email) {
    console.warn('[n8n] sendEmailViaWorkflow: templateId and payload.email are required');
    return { delivered: false, reason: 'Missing templateId or recipient email' };
  }

  try {
    const response = await fetch(`${API_BASE}/integrations/n8n/trigger`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        template_id: templateId,
        payload,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error(`[n8n] Workflow trigger failed (${response.status}):`, error);
      return { delivered: false, reason: error.detail || `HTTP ${response.status}` };
    }

    return response.json();
  } catch (err) {
    console.error('[n8n] Network error triggering workflow:', err);
    return { delivered: false, reason: err.message };
  }
}

/**
 * Convenience: trigger the order-confirmation workflow.
 *
 * @param {Object} orderData - Order object from the backend
 * @param {Array}  items     - Order line items
 */
export async function sendOrderConfirmation(orderData, items = []) {
  return sendEmailViaWorkflow('order-confirmation', {
    email: orderData.customer_email,
    name: orderData.customer_name,
    orderId: orderData.id || orderData.order_id,
    orderNumber: orderData.order_number,
    orderData,
    items,
  });
}

/**
 * Convenience: trigger the shipping-notification workflow.
 *
 * @param {Object} orderData    - Order object from the backend
 * @param {string} trackingCode - Carrier tracking code
 * @param {string} trackingUrl  - Full tracking URL
 * @param {string} carrier      - Carrier name (e.g. 'PostNL')
 */
export async function sendShippingNotification(orderData, trackingCode, trackingUrl, carrier) {
  return sendEmailViaWorkflow('shipping-notification', {
    email: orderData.customer_email,
    name: orderData.customer_name,
    orderId: orderData.id || orderData.order_id,
    orderNumber: orderData.order_number,
    trackingCode,
    trackingUrl,
    carrier,
    orderData,
  });
}

/**
 * Convenience: trigger the payment-receipt workflow.
 *
 * @param {Object} orderData - Order object from the backend
 * @param {Array}  items     - Order line items
 */
export async function sendPaymentReceipt(orderData, items = []) {
  return sendEmailViaWorkflow('payment-receipt', {
    email: orderData.customer_email,
    name: orderData.customer_name,
    orderId: orderData.id || orderData.order_id,
    orderNumber: orderData.order_number,
    totalAmount: orderData.total_amount,
    paymentMethod: orderData.payment_method,
    orderData,
    items,
  });
}

/**
 * Convenience: trigger the abandoned-cart workflow.
 *
 * @param {string} email     - Shopper email
 * @param {string} name      - Shopper name
 * @param {Array}  cartItems - Cart line items
 * @param {number} total     - Cart total
 */
export async function sendAbandonedCartEmail(email, name, cartItems, total) {
  return sendEmailViaWorkflow('abandoned-cart', {
    email,
    name,
    items: cartItems,
    totalAmount: total,
    checkoutUrl: `${window.location.origin}/checkout`,
  });
}
