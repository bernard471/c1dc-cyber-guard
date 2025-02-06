import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { FinancialFraud } from '@/models/FinancialFraud';
import { getDataFromToken } from "@/helpers/getdatafromtoken";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();
    const userId = await getDataFromToken(req);
    
    // Generate unique report ID
    const reportId = `FF-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    const financialFraudReport = await FinancialFraud.create({
      ...data,
      reportId,
      userId,
      status: 'pending',
      dateDiscovered: new Date(data.dateDiscovered),
      evidenceFiles: data.evidenceFiles.map((file: File) => ({
        fileName: file.name,
        uploadDate: new Date()
      })),
      transactionDetails: {
        ...data.transactionDetails,
        amountLost: data.transactionDetails?.amountLost ? parseFloat(data.transactionDetails.amountLost) : null,
        transactionDate: data.transactionDetails?.transactionDate ? new Date(data.transactionDetails.transactionDate) : null
      },
      recoveryStatus: {
        ...data.recoveryStatus,
        recoveryAmount: data.recoveryStatus?.recoveryAmount ? parseFloat(data.recoveryStatus.recoveryAmount) : null
      },
      affectedServices: data.affectedServices.map((service: { dateAffected: string | number | Date }) => ({
        ...service,
        dateAffected: new Date(service.dateAffected)
      }))    });

    return NextResponse.json({
      success: true,
      message: 'Financial fraud report submitted successfully',
      data: {
        reportId: financialFraudReport.reportId,
        status: financialFraudReport.status
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to submit financial fraud report',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const userId = await getDataFromToken(req);

    const reports = await FinancialFraud.find({ userId })
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
