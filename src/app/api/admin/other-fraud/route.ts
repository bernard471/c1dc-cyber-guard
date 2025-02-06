import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { OtherFraud } from '@/models/OtherFraud';

export async function GET() {
  try {
    await connectDB();
    const reports = await OtherFraud.find({})
      .sort({ createdAt: -1 })
      .select('-__v');
      
    return NextResponse.json({ 
      success: true, 
      data: reports 
    });

  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch reports'
    }, { status: 500 });
  }
}
