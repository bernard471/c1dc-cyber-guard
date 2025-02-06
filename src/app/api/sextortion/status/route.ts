import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Sextortion } from '@/models/Sextortion';

export async function PUT(request: Request) {
  try {
    await connectDB();
    
    // Extract reportId from the request body
    const { reportId, status, statusMessage } = await request.json();

    if (!reportId) {
      return NextResponse.json(
        { success: false, message: "Report ID is required" },
        { status: 400 }
      );
    }

    const updatedReport = await Sextortion.findOneAndUpdate(
      { reportId },
      { 
        status,
        statusMessage,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!updatedReport) {
      return NextResponse.json({
        success: false,
        message: 'Report not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: updatedReport
    });

  } catch (error) {
    console.error('Error updating report:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update report'
    }, { status: 500 });
  }
}
