/**
 * Email Template Definitions
 *
 * These definitions describe the email templates that are configured
 * as workflows inside n8n. Each entry maps a template ID to its
 * metadata, required variables, and a plain-text fallback preview.
 *
 * The actual HTML rendering happens inside n8n; these definitions
 * are used by the frontend and backend to:
 *   - Validate that all required variables are present before triggering
 *   - Display template names in the admin email-templates UI
 *   - Provide fallback plain-text content when n8n is unavailable
 */

/**
 * @typedef {Object} EmailTemplate
 * @property {string}   id            - Unique template identifier (matches n8n workflow name)
 * @property {string}   name          - Human-readable display name
 * @property {string}   subject       - Default email subject line (may use {{variables}})
 * @property {string}   description   - Short description shown in admin UI
 * @property {string[]} requiredVars  - Variables that must be present in the payload
 * @property {string[]} optionalVars  - Variables that enrich the template but are not required
 * @property {string}   flow          - Automation flow this template belongs to
 * @property {number}   delayHours    - Hours after trigger event before sending (0 = immediate)
 * @property {number}   sequence      - Position within the flow (1-based)
 */

/** @type {EmailTemplate[]} */
export const EMAIL_TEMPLATES = [
  // ─── Order Confirmation ───────────────────────────────────────────────────
  {
    id: 'order-confirmation',
    name: 'Orderbevestiging',
    subject: 'Bedankt voor je bestelling bij Droomvriendjes! #{{orderNumber}}',
    description:
      'Sent immediately after a successful Mollie payment. Includes order summary, ' +
      'estimated delivery date, and customer support contact.',
    requiredVars: ['email', 'name', 'orderId', 'orderNumber', 'totalAmount'],
    optionalVars: ['items', 'shippingAddress', 'paymentMethod', 'giftWrap'],
    flow: 'post-purchase',
    delayHours: 0,
    sequence: 1,
  },

  // ─── Shipping Notification ────────────────────────────────────────────────
  {
    id: 'shipping-notification',
    name: 'Verzendbevestiging',
    subject: '🚚 Je bestelling #{{orderNumber}} is onderweg!',
    description:
      'Triggered when a tracking code is added to an order (manually via admin or ' +
      'automatically via ShipStation webhook). Contains track & trace link.',
    requiredVars: ['email', 'name', 'orderId', 'orderNumber', 'trackingCode', 'trackingUrl'],
    optionalVars: ['carrier', 'estimatedDelivery', 'items'],
    flow: 'post-purchase',
    delayHours: 0,
    sequence: 2,
  },

  // ─── Payment Receipt ──────────────────────────────────────────────────────
  {
    id: 'payment-receipt',
    name: 'Betalingsbewijs',
    subject: 'Betalingsbewijs voor bestelling #{{orderNumber}}',
    description:
      'Detailed payment receipt with itemised line items, VAT breakdown, and ' +
      'payment method. Useful for B2B customers who need an invoice.',
    requiredVars: ['email', 'name', 'orderId', 'orderNumber', 'totalAmount', 'paymentMethod'],
    optionalVars: ['items', 'vatAmount', 'discountCode', 'discountAmount'],
    flow: 'post-purchase',
    delayHours: 0,
    sequence: 3,
  },

  // ─── Abandoned Cart ───────────────────────────────────────────────────────
  {
    id: 'abandoned-cart',
    name: 'Verlaten Winkelwagen (Herinnering 1)',
    subject: 'Oeps, vergeten? 🌙 Je winkelmandje wacht op je',
    description:
      'First reminder sent 1 hour after a checkout session is started but not completed.',
    requiredVars: ['email', 'name', 'checkoutUrl'],
    optionalVars: ['items', 'totalAmount'],
    flow: 'abandoned-cart',
    delayHours: 1,
    sequence: 1,
  },
  {
    id: 'abandoned-cart-2',
    name: 'Verlaten Winkelwagen (Herinnering 2)',
    subject: '{{name}}, twijfel je nog over je bestelling?',
    description:
      'Second reminder sent 24 hours after cart abandonment. Highlights social proof ' +
      'and key benefits.',
    requiredVars: ['email', 'name', 'checkoutUrl'],
    optionalVars: ['items', 'totalAmount'],
    flow: 'abandoned-cart',
    delayHours: 24,
    sequence: 2,
  },
  {
    id: 'abandoned-cart-3',
    name: 'Verlaten Winkelwagen (Laatste kans)',
    subject: '⏰ Laatste kans: Je winkelmandje verloopt vanavond',
    description:
      'Final reminder sent 72 hours after cart abandonment. Includes a 15% discount code.',
    requiredVars: ['email', 'name', 'checkoutUrl'],
    optionalVars: ['items', 'totalAmount', 'discountCode'],
    flow: 'abandoned-cart',
    delayHours: 72,
    sequence: 3,
  },

  // ─── Welcome Series ───────────────────────────────────────────────────────
  {
    id: 'welcome',
    name: 'Welkom (Mail 1 – Kortingscode)',
    subject: 'Welkom bij Droomvriendjes! Hier is je 15% korting 🌙',
    description:
      'Sent immediately when a visitor subscribes to the newsletter. Contains a ' +
      'welcome discount code (WELKOM15).',
    requiredVars: ['email', 'name'],
    optionalVars: ['discountCode', 'shopUrl'],
    flow: 'welcome',
    delayHours: 0,
    sequence: 1,
  },
  {
    id: 'welcome-2',
    name: 'Welkom (Mail 2 – Educatief)',
    subject: 'Hoe Droomvriendjes jouw kleintje helpt doorslapen 💤',
    description:
      'Educational email sent 72 hours after subscription. Explains the science ' +
      'behind weighted comfort toys.',
    requiredVars: ['email', 'name'],
    optionalVars: ['shopUrl'],
    flow: 'welcome',
    delayHours: 72,
    sequence: 2,
  },
  {
    id: 'welcome-3',
    name: 'Welkom (Mail 3 – Laatste kans korting)',
    subject: 'Laatste kans: Je 15% korting verloopt binnenkort ⏰',
    description:
      'Final welcome email sent 168 hours (7 days) after subscription. Urgency ' +
      'reminder that the welcome discount is expiring.',
    requiredVars: ['email', 'name'],
    optionalVars: ['discountCode', 'shopUrl'],
    flow: 'welcome',
    delayHours: 168,
    sequence: 3,
  },
];

/**
 * Look up a template definition by its ID.
 *
 * @param {string} templateId
 * @returns {EmailTemplate|undefined}
 */
export function getTemplate(templateId) {
  return EMAIL_TEMPLATES.find((t) => t.id === templateId);
}

/**
 * Get all templates belonging to a specific flow.
 *
 * @param {string} flow - e.g. 'post-purchase', 'abandoned-cart', 'welcome'
 * @returns {EmailTemplate[]}
 */
export function getTemplatesByFlow(flow) {
  return EMAIL_TEMPLATES.filter((t) => t.flow === flow).sort(
    (a, b) => a.sequence - b.sequence
  );
}

/**
 * Validate that all required variables are present in a payload.
 *
 * @param {string} templateId
 * @param {Object} payload
 * @returns {{ valid: boolean, missing: string[] }}
 */
export function validatePayload(templateId, payload) {
  const template = getTemplate(templateId);
  if (!template) return { valid: false, missing: [`Unknown template: ${templateId}`] };

  const missing = template.requiredVars.filter(
    (v) => payload[v] === undefined || payload[v] === null || payload[v] === ''
  );

  return { valid: missing.length === 0, missing };
}

export default EMAIL_TEMPLATES;
