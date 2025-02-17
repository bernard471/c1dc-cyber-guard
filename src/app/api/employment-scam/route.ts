import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { EmploymentScam } from '@/models/EmploymentScam';
import { getDataFromToken } from "@/helpers/getdatafromtoken";
import { getToken } from "next-auth/jwt";
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();
    
    let userId;
    
    const session = await getToken({ 
      req: req, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    if (session?.email) {
      if (!mongoose.connection.db) {
        throw new Error('Database connection not established');
      }
      const user = await mongoose.connection.db
        .collection('users')
        .findOne({ email: session.email });
      userId = user?._id;
    } else {
      userId = await getDataFromToken(req);
    }
    
    const reportId = `ES-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    const employmentScamReport = await EmploymentScam.create({
      ...data,
      reportId,
      userId,
      status: 'pending',
      dateOfIncident: new Date(data.dateOfIncident),
      evidenceFiles: data.evidenceFiles.map((file: File) => ({
        fileName: file.name,
        uploadDate: new Date()
      })),
      documentsSubmitted: data.documentsSubmitted.map((doc: { submissionDate: string | number | Date }) => ({
        ...doc,
        submissionDate: new Date(doc.submissionDate)
      })),      
      companyDetails: {
        ...data.companyDetails,
        promisedSalary: data.companyDetails?.promisedSalary ? parseFloat(data.companyDetails.promisedSalary) : null
      },
      financialDetails: {
        ...data.financialDetails,
        amountLost: data.financialDetails?.amountLost ? parseFloat(data.financialDetails.amountLost) : null,
        recruitmentFees: data.financialDetails?.recruitmentFees ? parseFloat(data.financialDetails.recruitmentFees) : null
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Employment scam report submitted successfully',
      data: {
        reportId: employmentScamReport.reportId,
        status: employmentScamReport.status
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to submit employment scam report',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    let userId;
    
    const session = await getToken({ 
      req: req, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    if (session?.email) {
      if (!mongoose.connection.db) {
        throw new Error('Database connection not established');
      }
      const user = await mongoose.connection.db
        .collection('users')
        .findOne({ email: session.email });
      userId = user?._id;
    } else {
      userId = await getDataFromToken(req);
    }

    const reports = await EmploymentScam.find({ userId })
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
