import { Resend } from 'resend';
import OrderModel from '@/models/Order';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.warn('[Resend] RESEND_API_KEY not configured. Emails will not be sent.');
}

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const SELLER_EMAIL = 'lariindustries@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Lari Industries <noreply@lariindustries.live>';

interface ContactInquiryEmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  productInterest?: string;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    };
    return entities[character];
  });
}

export async function sendContactInquiryToSeller(inquiry: ContactInquiryEmailData): Promise<boolean> {
  if (!resend) {
    console.error('[Resend] Contact inquiry email not sent: RESEND_API_KEY is not configured');
    return false;
  }

  const subject = inquiry.subject?.trim() || 'General Website Inquiry';
  const safe = {
    name: escapeHtml(inquiry.name),
    email: escapeHtml(inquiry.email),
    phone: escapeHtml(inquiry.phone || 'Not provided'),
    company: escapeHtml(inquiry.company || 'Not provided'),
    subject: escapeHtml(subject),
    message: escapeHtml(inquiry.message).replace(/\n/g, '<br />'),
    productInterest: escapeHtml(inquiry.productInterest || 'Not specified'),
  };

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: SELLER_EMAIL,
      replyTo: inquiry.email,
      subject: `New Contact Inquiry: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; color: #1f2937;">
          <h2 style="margin-bottom: 24px;">New inquiry from Lari Industries website</h2>
          <p><strong>Name:</strong> ${safe.name}</p>
          <p><strong>Email:</strong> ${safe.email}</p>
          <p><strong>Phone:</strong> ${safe.phone}</p>
          <p><strong>Company:</strong> ${safe.company}</p>
          <p><strong>Product interest:</strong> ${safe.productInterest}</p>
          <p><strong>Subject:</strong> ${safe.subject}</p>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: normal; line-height: 1.6;">${safe.message}</p>
        </div>
      `,
    });

    console.log('[Resend] Contact inquiry sent:', result.data?.id);
    return true;
  } catch (error) {
    console.error('[Resend] Failed to send contact inquiry:', error);
    return false;
  }
}

export async function sendContactAcknowledgementToCustomer(
  inquiry: ContactInquiryEmailData
): Promise<boolean> {
  if (!resend) {
    console.error('[Resend] Customer acknowledgement not sent: RESEND_API_KEY is not configured');
    return false;
  }

  const name = escapeHtml(inquiry.name);
  const subject = escapeHtml(inquiry.subject?.trim() || 'your inquiry');

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: inquiry.email,
      replyTo: SELLER_EMAIL,
      subject: 'We received your inquiry — Lari Industries',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; color: #1f2937; line-height: 1.6;">
          <h2 style="color: #e74c3c;">Thank you for contacting Lari Industries, ${name}!</h2>
          <p>We have received your inquiry regarding <strong>${subject}</strong>.</p>
          <p>Our sales team in Kanpur will review your request and contact you within 24 hours.</p>
          <p>If you need to add anything, simply reply to this email and our team will receive it.</p>
          <p>Warm regards,<br /><strong>Lari Industries</strong><br />Kanpur, India</p>
        </div>
      `,
    });

    console.log('[Resend] Customer acknowledgement sent:', result.data?.id);
    return true;
  } catch (error) {
    console.error('[Resend] Failed to send customer acknowledgement:', error);
    return false;
  }
}

export async function sendWelcomeEmail(user: { name?: string | null; email: string }): Promise<boolean> {
  if (!resend) {
    console.error('[Resend] Welcome email not sent: RESEND_API_KEY is not configured');
    return false;
  }

  const name = escapeHtml(user.name?.trim() || 'there');

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: 'Welcome to Lari Industries',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; color: #1f2937; line-height: 1.6;">
          <h2 style="color: #e74c3c;">Welcome to Lari Industries, ${name}!</h2>
          <p>Thank you for creating an account with us. Your account is ready, and you can now enjoy a smoother checkout experience and keep track of your orders.</p>
          <p>If you need a product quotation, custom specification, or export assistance, our Kanpur team will be happy to help.</p>
          <p>Warm regards,<br /><strong>Lari Industries</strong><br />Kanpur, India</p>
        </div>
      `,
    });

    console.log('[Resend] Welcome email sent:', result.data?.id);
    return true;
  } catch (error) {
    console.error('[Resend] Failed to send welcome email:', error);
    return false;
  }
}

interface EmailOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  selectedSize?: string;
}

interface EmailShippingAddress {
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  gstNumber?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  pincode?: string;
  country: string;
}

interface OrderEmailData {
  receiptNumber: string;
  items: EmailOrderItem[];
  subtotal: number;
  discountCode?: string | null;
  discountAmount: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  shippingAddress: EmailShippingAddress;
  status: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  createdAt: Date;
}

function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function generateOrderItemsHtml(items: EmailOrderItem[]): string {
  return items
    .map(
      (item) => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 12px 8px;">
        <div style="font-weight: 600; color: #1f2937;">${item.name}</div>
        ${item.selectedSize ? `<div style="font-size: 12px; color: #6b7280;">Size: ${item.selectedSize}</div>` : ''}
      </td>
      <td style="padding: 12px 8px; text-align: center; color: #374151;">${item.quantity}</td>
      <td style="padding: 12px 8px; text-align: right; color: #374151;">${formatCurrency(item.price)}</td>
      <td style="padding: 12px 8px; text-align: right; font-weight: 600; color: #1f2937;">${formatCurrency(item.price * item.quantity)}</td>
    </tr>
  `
    )
    .join('');
}

function generateShippingAddressHtml(address: EmailShippingAddress): string {
  return `
    <div style="font-size: 14px; color: #374151; line-height: 1.6;">
      <strong>${address.fullName}</strong><br/>
      ${address.companyName ? `${address.companyName}<br/>` : ''}
      ${address.addressLine1}<br/>
      ${address.addressLine2 ? `${address.addressLine2}<br/>` : ''}
      ${address.city}, ${address.state || ''} ${address.pincode || ''}<br/>
      ${address.country}<br/>
      ${address.phone ? `Phone: ${address.phone}<br/>` : ''}
      Email: ${address.email}
    </div>
  `;
}

export async function sendOrderConfirmationToBuyer(order: OrderEmailData): Promise<boolean> {
  if (!resend) {
    console.log('[Resend] Skipping buyer email - Resend not configured');
    return false;
  }

  const itemsHtml = generateOrderItemsHtml(order.items);
  const shippingHtml = generateShippingAddressHtml(order.shippingAddress);
  const discountRow = order.discountCode
    ? `
    <tr>
      <td colspan="3" style="padding: 12px 8px; text-align: right; color: #059669;">Discount (${order.discountCode})</td>
      <td style="padding: 12px 8px; text-align: right; color: #059669; font-weight: 600;">-${formatCurrency(order.discountAmount)}</td>
    </tr>
  `
    : '';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 32px 24px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Lari Industries</h1>
            <p style="margin: 8px 0 0; color: #fecaca; font-size: 14px;">Industrial Safety & Leather Goods — Kanpur, India</p>
          </div>

          <!-- Confirmation Message -->
          <div style="padding: 32px 24px;">
            <h2 style="margin: 0 0 16px; color: #1f2937; font-size: 22px; font-weight: 700;">Order Confirmed! 🎉</h2>
            <p style="margin: 0 0 24px; color: #4b5563; font-size: 15px; line-height: 1.6;">
              Thank you for your order, <strong>${order.shippingAddress.fullName}</strong>! 
              Your payment has been successfully processed and your order is now being prepared at our factory in Kanpur.
            </p>

            <!-- Order Details Card -->
            <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Order Reference</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #1f2937; font-family: monospace;">${order.receiptNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Razorpay Order ID</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #1f2937; font-family: monospace; font-size: 13px;">${order.razorpayOrderId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Payment Status</td>
                  <td style="padding: 8px 0; text-align: right;">
                    <span style="background: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">${order.status}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Order Date</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #1f2937;">${order.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                </tr>
              </table>
            </div>

            <!-- Items Table -->
            <h3 style="margin: 0 0 16px; color: #1f2937; font-size: 16px; font-weight: 600;">Order Items</h3>
            <div style="overflow-x: auto; border: 1px solid #e5e7eb; border-radius: 8px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <thead>
                  <tr style="background: #f3f4f6;">
                    <th style="padding: 12px 8px; text-align: left; color: #374151; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Item</th>
                    <th style="padding: 12px 8px; text-align: center; color: #374151; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Qty</th>
                    <th style="padding: 12px 8px; text-align: right; color: #374151; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Price</th>
                    <th style="padding: 12px 8px; text-align: right; color: #374151; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot style="background: #f9fafb;">
                  <tr>
                    <td colspan="3" style="padding: 12px 8px; text-align: right; color: #374151;">Subtotal</td>
                    <td style="padding: 12px 8px; text-align: right; font-weight: 600; color: #1f2937;">${formatCurrency(order.subtotal)}</td>
                  </tr>
                  ${discountRow}
                  <tr>
                    <td colspan="3" style="padding: 12px 8px; text-align: right; color: #374151;">Shipping</td>
                    <td style="padding: 12px 8px; text-align: right; font-weight: 600; color: #1f2937;">${order.shipping === 0 ? '<span style="color: #059669;">FREE</span>' : formatCurrency(order.shipping)}</td>
                  </tr>
                  <tr>
                    <td colspan="3" style="padding: 12px 8px; text-align: right; color: #374151;">Tax (5%)</td>
                    <td style="padding: 12px 8px; text-align: right; font-weight: 600; color: #1f2937;">${formatCurrency(order.tax)}</td>
                  </tr>
                  <tr style="border-top: 2px solid #e5e7eb;">
                    <td colspan="3" style="padding: 16px 8px 12px; text-align: right; color: #1f2937; font-size: 15px; font-weight: 700;">Grand Total</td>
                    <td style="padding: 16px 8px 12px; text-align: right; color: #dc2626; font-size: 18px; font-weight: 700;">${formatCurrency(order.total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <!-- Shipping Address -->
            <h3 style="margin: 24px 0 12px; color: #1f2937; font-size: 16px; font-weight: 600;">Shipping Address</h3>
            <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
              ${shippingHtml}
            </div>

            <!-- Next Steps -->
            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
              <h4 style="margin: 0 0 12px; color: #1e40af; font-size: 14px; font-weight: 600;">What happens next?</h4>
              <ul style="margin: 0; padding-left: 20px; color: #1e40af; font-size: 13px; line-height: 1.8;">
                <li>Our Kanpur logistics team will process your order within 24 hours.</li>
                <li>You will receive a separate email with tracking details once the shipment is dispatched.</li>
                <li>For any queries, reply to this email or contact us at <strong>info@lariindustries.com</strong>.</li>
              </ul>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px;">Lari Industries — Since 1998</p>
            <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px;">Kanpur, Uttar Pradesh, India</p>
            <p style="margin: 0; color: #9ca3af; font-size: 12px;">This is an automated confirmation. Please do not reply directly to this email.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: order.shippingAddress.email,
      subject: `Order Confirmed — ${order.receiptNumber} | Lari Industries`,
      html,
    });

    console.log('[Resend] Buyer confirmation sent:', result.data?.id);
    return true;
  } catch (error) {
    console.error('[Resend] Failed to send buyer confirmation:', error);
    return false;
  }
}

export async function sendOrderNotificationToSeller(order: OrderEmailData): Promise<boolean> {
  if (!resend) {
    console.log('[Resend] Skipping seller email - Resend not configured');
    return false;
  }

  const itemsHtml = generateOrderItemsHtml(order.items);
  const shippingHtml = generateShippingAddressHtml(order.shippingAddress);
  const discountRow = order.discountCode
    ? `
    <tr>
      <td colspan="3" style="padding: 12px 8px; text-align: right; color: #059669;">Discount (${order.discountCode})</td>
      <td style="padding: 12px 8px; text-align: right; color: #059669; font-weight: 600;">-${formatCurrency(order.discountAmount)}</td>
    </tr>
  `
    : '';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); padding: 32px 24px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">🔔 New Order Received</h1>
            <p style="margin: 8px 0 0; color: #9ca3af; font-size: 14px;">Lari Industries — Internal Notification</p>
          </div>

          <!-- Alert Banner -->
          <div style="background: #fef3c7; border-bottom: 1px solid #fcd34d; padding: 16px 24px; text-align: center;">
            <span style="color: #92400e; font-weight: 600; font-size: 14px;">New order requires processing — ${order.receiptNumber}</span>
          </div>

          <!-- Order Details -->
          <div style="padding: 32px 24px;">
            <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Order Reference</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #1f2937; font-family: monospace;">${order.receiptNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Razorpay Order ID</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #1f2937; font-family: monospace; font-size: 13px;">${order.razorpayOrderId}</td>
                </tr>
                ${order.razorpayPaymentId ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Razorpay Payment ID</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #1f2937; font-family: monospace; font-size: 13px;">${order.razorpayPaymentId}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Payment Status</td>
                  <td style="padding: 8px 0; text-align: right;">
                    <span style="background: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">${order.status}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Order Date</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #1f2937;">${order.createdAt.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Order Value</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #dc2626; font-size: 18px;">${formatCurrency(order.total)}</td>
                </tr>
              </table>
            </div>

            <!-- Customer Info -->
            <h3 style="margin: 0 0 12px; color: #1f2937; font-size: 16px; font-weight: 600;">Customer Details</h3>
            <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
              ${shippingHtml}
            </div>

            <!-- Items Table -->
            <h3 style="margin: 0 0 16px; color: #1f2937; font-size: 16px; font-weight: 600;">Items Ordered</h3>
            <div style="overflow-x: auto; border: 1px solid #e5e7eb; border-radius: 8px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <thead>
                  <tr style="background: #f3f4f6;">
                    <th style="padding: 12px 8px; text-align: left; color: #374151; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Product</th>
                    <th style="padding: 12px 8px; text-align: center; color: #374151; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Qty</th>
                    <th style="padding: 12px 8px; text-align: right; color: #374151; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Unit Price</th>
                    <th style="padding: 12px 8px; text-align: right; color: #374151; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Line Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot style="background: #f9fafb;">
                  <tr>
                    <td colspan="3" style="padding: 12px 8px; text-align: right; color: #374151;">Subtotal</td>
                    <td style="padding: 12px 8px; text-align: right; font-weight: 600; color: #1f2937;">${formatCurrency(order.subtotal)}</td>
                  </tr>
                  ${discountRow}
                  <tr>
                    <td colspan="3" style="padding: 12px 8px; text-align: right; color: #374151;">Shipping</td>
                    <td style="padding: 12px 8px; text-align: right; font-weight: 600; color: #1f2937;">${order.shipping === 0 ? '<span style="color: #059669;">FREE</span>' : formatCurrency(order.shipping)}</td>
                  </tr>
                  <tr>
                    <td colspan="3" style="padding: 12px 8px; text-align: right; color: #374151;">Tax (5%)</td>
                    <td style="padding: 12px 8px; text-align: right; font-weight: 600; color: #1f2937;">${formatCurrency(order.tax)}</td>
                  </tr>
                  <tr style="border-top: 2px solid #e5e7eb;">
                    <td colspan="3" style="padding: 16px 8px 12px; text-align: right; color: #1f2937; font-size: 15px; font-weight: 700;">Total</td>
                    <td style="padding: 16px 8px 12px; text-align: right; color: #dc2626; font-size: 18px; font-weight: 700;">${formatCurrency(order.total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <!-- Action Required -->
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px;">
              <h4 style="margin: 0 0 12px; color: #991b1b; font-size: 14px; font-weight: 600;">⚡ Action Required</h4>
              <ul style="margin: 0; padding-left: 20px; color: #991b1b; font-size: 13px; line-height: 1.8;">
                <li>Verify stock availability for all items.</li>
                <li>Prepare shipment from Kanpur factory.</li>
                <li>Generate air-waybill and update order with tracking.</li>
                <li>Mark order as <strong>SHIPPED</strong> in the system once dispatched.</li>
              </ul>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px;">Lari Industries — Internal Order Management</p>
            <p style="margin: 0; color: #9ca3af; font-size: 12px;">This is an automated internal notification.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: SELLER_EMAIL,
      subject: `🔔 New Order: ${order.receiptNumber} — ${formatCurrency(order.total)}`,
      html,
    });

    console.log('[Resend] Seller notification sent:', result.data?.id);
    return true;
  } catch (error) {
    console.error('[Resend] Failed to send seller notification:', error);
    return false;
  }
}

export async function sendOrderConfirmationEmails(order: OrderEmailData): Promise<{ buyer: boolean; seller: boolean }> {
  const [buyerResult, sellerResult] = await Promise.allSettled([
    sendOrderConfirmationToBuyer(order),
    sendOrderNotificationToSeller(order),
  ]);

  return {
    buyer: buyerResult.status === 'fulfilled' ? buyerResult.value : false,
    seller: sellerResult.status === 'fulfilled' ? sellerResult.value : false,
  };
}
