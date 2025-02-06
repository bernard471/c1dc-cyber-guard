import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import EmergencyReport from '@/models/EmergencyReport';

// Add console.log to see what data is being sent
export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const caseNumber = searchParams.get('caseNumber');

    const report = await EmergencyReport.findOne(
      { caseNumber },
      { files: 1, caseNumber: 1, _id: 0 }
    );

    console.log('Report data:', report); // Add this to see the data

    return NextResponse.json({
      success: true,
      data: {
        files: report.files,
        caseNumber: report.caseNumber
      }
    });
  } catch (error) {
    console.error('Failed to fetch evidence:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch evidence'
    }, { status: 500 });
  }
}
