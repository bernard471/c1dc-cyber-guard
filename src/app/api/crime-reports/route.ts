import { NextResponse, NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import CrimeReport from '@/models/CrimeReport';

export async function POST(req: NextRequest) {
  try {
    // Ensure DB connection is established
     await connectDB();
    const body = await req.json();

    // Create the final report data structure
    const finalReportData = {
      caseNumber: body.caseNumber,
      name: body.name,
      contact: body.contact,
      severity: body.severity,
      description: body.description,
      location: body.location,
      files: body.files.map((file: { fileName: string; fileData: string; fileType: string }) => ({
        fileName: file.fileName,
        fileData: file.fileData,
        fileType: file.fileType,
        uploadDate: new Date()
      })),
      statusMessage: '',
      status: 'pending'
    };

    const crimeReport = await CrimeReport.create(finalReportData);

    return NextResponse.json({
      success: true,
      data: crimeReport,
    }, { status: 201 });

  } catch (error) {
    console.error('Crime Report Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create crime report',
    }, { status: 500 });
  }
}


export async function GET() {
  try {
    await connectDB;
    const reports = await CrimeReport.find()
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
