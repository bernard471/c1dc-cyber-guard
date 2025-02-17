import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { IdentityTheft } from '@/models/IdentityTheft';
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
    
    const reportId = `IT-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    const identityTheftReport = await IdentityTheft.create({
      ...data,
      reportId,
      userId,
      status: 'pending',
      dateDiscovered: new Date(data.dateDiscovered),
      financialLoss: data.financialLoss ? parseFloat(data.financialLoss) : null,
      evidenceFiles: data.evidenceFiles.map((file: File) => ({
        fileName: file.name,
        uploadDate: new Date()
      })),
      documentsCompromised: data.documentsCompromised.map((doc: { dateCompromised: string | number | Date }) => ({
        ...doc,
        dateCompromised: new Date(doc.dateCompromised)
      })),
      accountsAffected: data.accountsAffected.map((account: { dateAffected: string | number | Date }) => ({
        ...account,
        dateAffected: new Date(account.dateAffected)
      }))
    });

    return NextResponse.json({
      success: true,
      message: 'Identity theft report submitted successfully',
      data: {
        reportId: identityTheftReport.reportId,
        status: identityTheftReport.status
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to submit identity theft report',
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

    const reports = await IdentityTheft.find({ userId })
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
