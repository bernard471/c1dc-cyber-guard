import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { OtherFraud } from '@/models/OtherFraud';
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
    
    const reportId = `OF-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    const otherFraudReport = await OtherFraud.create({
      ...data,
      reportId,
      userId,
      status: 'pending',
      dateOfIncident: new Date(data.dateOfIncident),
      evidenceFiles: data.evidenceFiles.map((file: File) => ({
        fileName: file.name,
        uploadDate: new Date()
      })),
      methodDetails: {
        ...data.methodDetails,
        fraudTechniques: Array.isArray(data.methodDetails?.fraudTechniques) 
          ? data.methodDetails.fraudTechniques 
          : []
      },
      impactDetails: {
        ...data.impactDetails,
        amountLost: data.impactDetails?.amountLost ? parseFloat(data.impactDetails.amountLost) : null
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Other fraud report submitted successfully',
      data: {
        reportId: otherFraudReport.reportId,
        status: otherFraudReport.status
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to submit other fraud report',
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

    const reports = await OtherFraud.find({ userId })
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
