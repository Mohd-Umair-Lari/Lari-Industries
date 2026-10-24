import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ContactInquiry from '@/models/ContactInquiry';
import {
  sendContactAcknowledgementToCustomer,
  sendContactInquiryToSeller,
} from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, subject, message, isB2bQuote, productInterest } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    try {
      await connectDB();
      await ContactInquiry.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim(),
        subject: subject?.trim(),
        message: message.trim(),
        isB2bQuote: Boolean(isB2bQuote),
        productInterest: productInterest?.trim(),
        status: 'NEW',
      });
    } catch (dbErr) {
      console.error('[MongoDB] Failed to save contact inquiry:', dbErr);
    }

    const inquiry = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      company: company?.trim(),
      subject: subject?.trim(),
      message: message.trim(),
      productInterest: productInterest?.trim(),
    };

    const ownerEmailSent = await sendContactInquiryToSeller(inquiry);

    if (!ownerEmailSent) {
      return NextResponse.json(
        { error: 'Your inquiry could not be delivered to Lari Industries. Please try again or email us directly.' },
        { status: 503 }
      );
    }

    const customerEmailSent = await sendContactAcknowledgementToCustomer(inquiry);
    if (!customerEmailSent) {
      console.warn('[Contact/RFQ] Owner notification sent, but customer acknowledgement failed:', inquiry.email);
    }

    console.log('[Contact/RFQ] Saved inquiry from:', email, '| B2B:', isB2bQuote);

    return NextResponse.json({
      success: true,
      ownerEmailSent: true,
      customerAcknowledgementSent: customerEmailSent,
      message:
        'Your inquiry has been received. Our sales engineering team in Kanpur will contact you within 24 hours.',
    });
  } catch (error: any) {
    console.error('Error handling contact form:', error);
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}
