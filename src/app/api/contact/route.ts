import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, isB2bQuote, productInterest } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // In production, integrate email service like Resend, Nodemailer, or AWS SES
    console.log('[Contact / RFQ Submission Received]:', {
      name,
      email,
      phone,
      subject,
      message,
      isB2bQuote,
      productInterest,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been received. Our sales engineering team in Kanpur will contact you within 24 hours.',
    });
  } catch (error: any) {
    console.error('Error handling contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}
