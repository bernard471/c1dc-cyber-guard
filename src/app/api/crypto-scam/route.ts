import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { CryptoScam } from '@/models/CryptoScam';
import { getDataFromToken } from "@/helpers/getdatafromtoken";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();
    const userId = await getDataFromToken(req);
    
    // Generate unique report ID
    const reportId = `CS-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    const cryptoScamReport = await CryptoScam.create({
      ...data,
      reportId,
      userId,
      status: 'pending',
      dateOfIncident: new Date(data.dateOfIncident),
      evidenceFiles: data.evidenceFiles.map((file: File) => ({
        fileName: file.name,
        uploadDate: new Date()
      })),
      transactionDetails: {
        ...data.transactionDetails,
        amountLost: data.transactionDetails?.amountLost ? parseFloat(data.transactionDetails.amountLost) : null,
        investmentPromised: data.transactionDetails?.investmentPromised ? parseFloat(data.transactionDetails.investmentPromised) : null
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Crypto scam report submitted successfully',
      data: {
        reportId: cryptoScamReport.reportId,
        status: cryptoScamReport.status
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to submit crypto scam report',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const userId = await getDataFromToken(req);

    const reports = await CryptoScam.find({ userId })
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
