import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import  EmergencyReport  from '@/models/EmergencyReport';

export async function GET() {
  try {
    await connectDB();
    const reports = await EmergencyReport.find({})
      .sort({ createdAt: -1 })
      .select('-__v');
      
    return NextResponse.json({ 
      success: true, 
      data: reports 
    });

  } catch (error) {
    console.error('Error fetching emergency reports:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch emergency reports'
    }, { status: 500 });
  }
}
