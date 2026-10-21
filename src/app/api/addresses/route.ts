import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(session.user.id).select('addresses');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ addresses: user.addresses });
  } catch (error) {
    console.error('GET addresses error:', error);
    return NextResponse.json({ error: 'Failed to fetch addresses' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      label,
      fullName,
      email,
      phone,
      companyName,
      gstNumber,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      country,
      isDefault: isDefaultBody,
    } = body;

    if (!label || !fullName || !email || !addressLine1 || !city || !country) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Determine if this should be default
    let isDefault = isDefaultBody || false;
    if (isDefault) {
      user.addresses.forEach((addr: any) => {
        addr.isDefault = false;
      });
    } else if (user.addresses.length === 0) {
      isDefault = true;
    }

    const newAddress = {
      _id: new mongoose.Types.ObjectId(),
      label,
      fullName,
      email: email.toLowerCase(),
      phone: phone || '',
      companyName: companyName || '',
      gstNumber: gstNumber || '',
      addressLine1,
      addressLine2: addressLine2 || '',
      city,
      state: state || '',
      pincode: pincode || '',
      country,
      isDefault: isDefault || false,
    } as any;

    user.addresses.push(newAddress);
    await user.save();

    const savedAddress = user.addresses[user.addresses.length - 1];
    return NextResponse.json({ address: savedAddress }, { status: 201 });
  } catch (error) {
    console.error('POST address error:', error);
    return NextResponse.json({ error: 'Failed to save address' }, { status: 500 });
  }
}