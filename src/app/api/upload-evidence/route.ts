import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Evidence from '@/models/EvidenceModels';
import mongoose from 'mongoose';

export async function POST(request: Request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const reportId = formData.get('reportId') as string;
    const caseNumber = formData.get('caseNumber') as string;
    const files = formData.getAll('files');
    
    if (!reportId && !caseNumber) {
      return NextResponse.json({ 
        success: false, 
        message: 'Either Report ID or Case Number is required' 
      }, { status: 400 });
    }

    const filePromises = files.map(async (file: FormDataEntryValue) => {
      if (file instanceof File) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileData = `data:${file.type};base64,${buffer.toString('base64')}`;

        return {
          fileName: file.name,
          fileData: fileData,
          fileType: file.type,
          uploadDate: new Date()
        };
      }
      throw new Error('Invalid file type');
    });
    const processedFiles = await Promise.all(filePromises);

    const evidence = await Evidence.create({
      reportId,
      caseNumber,
      files: processedFiles
    });

    return NextResponse.json({
      success: true,
      message: 'Evidence uploaded successfully',
      data: {
        evidenceId: evidence._id,
        reportId: evidence.reportId,
        caseNumber: evidence.caseNumber,
        filesCount: processedFiles.length
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to upload evidence',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const reportId = searchParams.get('reportId');
    const caseNumber = searchParams.get('caseNumber');

    if (!reportId && !caseNumber) {
      return NextResponse.json({ 
        success: false, 
        message: 'Either Report ID or Case Number is required' 
      }, { status: 400 });
    }

    const allEvidence = [];

    // Check Evidence collection
    const evidenceQuery = reportId ? { reportId } : { caseNumber };
    const evidences = await Evidence.find(evidenceQuery);
    allEvidence.push(...evidences);

    // Check EmergencyReports collection if caseNumber is provided
    if (caseNumber) {
      if (!mongoose.connection.db) {
        throw new Error('Database connection not established');
      }
      const emergencyReport = await mongoose.connection.db
        .collection('emergencyreports')
        .findOne({ caseNumber }, { projection: { files: 1 } });
          
        if (emergencyReport?.files) {
          allEvidence.push({
            caseNumber,
            files: emergencyReport.files
          });
        }
      }
    
    return NextResponse.json({
      success: true,
      data: allEvidence
    });

  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch evidence'
    }, { status: 500 });
  }
}
