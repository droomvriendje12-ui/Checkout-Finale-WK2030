/**
 * Mollie Payment Integration - Frontend Client
 *
 * All sensitive operations (API key, payment creation) are handled
 * server-side via the backend API. This module provides a clean
 * interface for the checkout flow to interact with Mollie payments
 * through the backend proxy endpoints.
 *
 * Environment variables required (backend):
 *   MOLLIE_API_KEY        - Mollie live_ or test_ API key
 *   MOLLIE_REDIRECT_URL   - Override redirect URL (optional, defaults to FRONTEND_URL)
 */

const API_BASE = '/api';

/**
 * Create a Mollie payment for an existing order.
 *
 * @param {string} orderId       - UUID of the order created via /api/orders
 * @param {string} paymentMethod - Mollie method: 'ideal', 'creditcard', 'paypal', etc.
 * @returns {Promise<{payment_id: string, checkout_url: string, status: string}>}
 */
export async function createPayment(orderId, paymentMethod = 'ideal') {
  const response = await fetch(`${API_BASE}/payments/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      order_id: orderId,
      payment_method: paymentMethod,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `Payment creation failed (${response.status})`);
  }

  return response.json();
}

/**
 * Check the current status of a payment / order.
 * Polls the backend which in turn checks Mollie if a payment ID is present.
 *
 * @param {string} orderId - UUID of the order
 * @returns {Promise<{status: string, total_amount: number, customer_email: string, ...}>}
 */
export async function getPaymentStatus(orderId) {
  const response = await fetch(`${API_BASE}/orders/${orderId}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `Could not fetch payment status (${response.status})`);
  }

  return response.json();
}

/**
 * Supported Mollie payment methods with display metadata.
 * Icons are served directly from Mollie's CDN.
 */
export const PAYMENT_METHODS = [
  {
    value: 'ideal',
    label: 'iDEAL',
    icon: 'https://www.mollie.com/external/icons/payment-methods/ideal.svg',
    popular: true,
    description: 'Direct via je bank',
  },
  {
    value: 'creditcard',
    label: 'Creditcard',
    icon: 'https://www.mollie.com/external/icons/payment-methods/creditcard.svg',
    description: 'Visa, Mastercard, Amex',
  },
  {
    value: 'in3',
    label: 'iDEAL in3',
    icon: 'https://www.mollie.com/external/icons/payment-methods/in3.svg',
    description: 'Betaal in 3 termijnen',
  },
  {
    value: 'bancontact',
    label: 'Bancontact',
    icon: 'https://www.mollie.com/external/icons/payment-methods/bancontact.svg',
    description: 'Voor België',
  },
  {
    value: 'paypal',
    label: 'PayPal',
    icon: 'https://www.mollie.com/external/icons/payment-methods/paypal.svg',
    description: 'Betaal met PayPal',
  },
  {
    value: 'applepay',
    label: 'Apple Pay',
    icon: 'https://www.mollie.com/external/icons/payment-methods/applepay.svg',
    express: true,
  },
  {
    value: 'googlepay',
    label: 'Google Pay',
    icon: 'https://www.mollie.com/external/icons/payment-methods/googlepay.svg',
    express: true,
  },
];

/**
 * Map a Mollie/order status string to a human-readable Dutch label and severity.
 *
 * @param {string} status
 * @returns {{ label: string, severity: 'success'|'warning'|'error'|'info' }}
 */
export function getStatusMeta(status) {
  const map = {
    paid: { label: 'Betaald', severity: 'success' },
    pending: { label: 'In behandeling', severity: 'warning' },
    open: { label: 'Openstaand', severity: 'info' },
    cancelled: { label: 'Geannuleerd', severity: 'error' },
    canceled: { label: 'Geannuleerd', severity: 'error' },
    expired: { label: 'Verlopen', severity: 'error' },
    failed: { label: 'Mislukt', severity: 'error' },
    shipped: { label: 'Verzonden', severity: 'success' },
    delivered: { label: 'Afgeleverd', severity: 'success' },
  };
  return map[status] ?? { label: status, severity: 'info' };
}
