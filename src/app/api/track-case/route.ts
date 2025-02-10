import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import CrimeReport from '@/models/CrimeReport';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const { caseNumber } = await request.json();
    const report = await CrimeReport.findOne({ caseNumber }).select('-__v');

    if (!report) {
      return NextResponse.json({ 
        success: false, 
        message: 'Case not found',
        code: 'CASE_NOT_FOUND'
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      data: report 
    });

  } catch (error) {
    console.error('Error fetching case details:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch case details',
      code: 'FETCH_ERROR'
    }, { status: 500 });
  }
}

