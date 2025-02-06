import { NextResponse, NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import EmergencyReport from '@/models/EmergencyReport';
import { getDataFromToken } from '@/helpers/getdatafromtoken';

export async function POST(req: NextRequest) {
  try {
    await connectDB;
    
    const body = await req.json();
    const userId = await getDataFromToken(req);

    // Create the final report data structure
    const finalReportData = {
      userId: userId,
      caseNumber: body.caseNumber,
      name: body.name,
      contact: body.contact,
      severity: body.severity,
      description: body.description,
      location: body.location,
      files: body.files = body.files.map((file: { fileName: string; fileData: string; fileType: string }) => ({
        fileName: file.fileName,
        fileData: file.fileData,
        fileType: file.fileType,
        uploadDate: new Date()
      })),
      statusMessage: '',
      status: 'pending'
    };

    const emergencyReport = await EmergencyReport.create(finalReportData);

    return NextResponse.json({
      success: true,
      data: emergencyReport,
    }, { status: 201 });

  } catch (error) {
    console.error('Emergency Report Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create emergency report',
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB;
    const userId = await getDataFromToken(req);

    const reports = await EmergencyReport.find({ userId })
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
