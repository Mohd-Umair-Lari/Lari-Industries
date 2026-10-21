import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
      isDefault,
    } = body;

    await connectDB();
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const addressIndex = user.addresses.findIndex((a: any) => a._id.toString() === params.id);
    if (addressIndex === -1) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }

    // If setting as default, unset others
    if (isDefault) {
      user.addresses.forEach((addr: any) => {
        addr.isDefault = false;
      });
    }

    user.addresses[addressIndex] = {
      ...user.addresses[addressIndex].toObject(),
      label: label || user.addresses[addressIndex].label,
      fullName: fullName || user.addresses[addressIndex].fullName,
      email: email?.toLowerCase() || user.addresses[addressIndex].email,
      phone: phone !== undefined ? phone : user.addresses[addressIndex].phone,
      companyName: companyName !== undefined ? companyName : user.addresses[addressIndex].companyName,
      gstNumber: gstNumber !== undefined ? gstNumber : user.addresses[addressIndex].gstNumber,
      addressLine1: addressLine1 || user.addresses[addressIndex].addressLine1,
      addressLine2: addressLine2 !== undefined ? addressLine2 : user.addresses[addressIndex].addressLine2,
      city: city || user.addresses[addressIndex].city,
      state: state !== undefined ? state : user.addresses[addressIndex].state,
      pincode: pincode !== undefined ? pincode : user.addresses[addressIndex].pincode,
      country: country || user.addresses[addressIndex].country,
      isDefault: isDefault !== undefined ? isDefault : user.addresses[addressIndex].isDefault,
    };

    await user.save();
    return NextResponse.json({ address: user.addresses[addressIndex] });
  } catch (error) {
    console.error('PUT address error:', error);
    return NextResponse.json({ error: 'Failed to update address' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const addressIndex = user.addresses.findIndex((a: any) => a._id.toString() === params.id);
    if (addressIndex === -1) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }

    const wasDefault = user.addresses[addressIndex].isDefault;
    user.addresses.splice(addressIndex, 1);

    // If deleted was default, make first remaining default
    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    await user.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE address error:', error);
    return NextResponse.json({ error: 'Failed to delete address' }, { status: 500 });
  }
}