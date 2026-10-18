import crypto from 'crypto';

export interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

export function getRazorpayKeyId(): string {
  return (
    process.env.RAZORPAY_KEY_ID ||
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
    ''
  ).trim();
}

export function getRazorpayKeySecret(): string {
  return (process.env.RAZORPAY_KEY_SECRET || '').trim();
}

export function getRazorpayWebhookSecret(): string {
  return (process.env.RAZORPAY_WEBHOOK_SECRET || '').trim();
}

export function isRazorpayConfigured(): boolean {
  const keyId = getRazorpayKeyId();
  const keySecret = getRazorpayKeySecret();

  if (!keyId || !keySecret) return false;
  if (keyId.includes('placeholder') || keySecret.includes('placeholder')) return false;
  return true;
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const secret = getRazorpayKeySecret();
  if (!secret) return false;

  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body.toString())
    .digest('hex');

  return timingSafeSignatureMatch(expectedSignature, signature);
}

export function verifyWebhookSignature(
  rawBody: string,
  signature: string
): boolean {
  const webhookSecret = getRazorpayWebhookSecret();
  if (!webhookSecret) return false;

  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody)
    .digest('hex');

  return timingSafeSignatureMatch(expectedSignature, signature);
}

function timingSafeSignatureMatch(expected: string, received: string): boolean {
  if (!/^[a-f0-9]{64}$/i.test(received)) return false;
  return crypto.timingSafeEqual(
    Buffer.from(expected, 'hex'),
    Buffer.from(received, 'hex')
  );
}
