import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { MomoFraud } from '@/models/MomoFraud';
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
    
    const reportId = `MF-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    const momoFraud = await MomoFraud.create({
      ...data,
      reportId,
      userId,
      status: 'pending',
      dateOfTransaction: new Date(data.dateOfTransaction),
      amount: parseFloat(data.amount),
      contactInfo: {
        name: data.contactInfo.name,
        email: data.contactInfo.email,
        phone: data.contactInfo.phone,
        contactPreference: data.contactInfo.contactPreference
      },
      evidenceFiles: data.evidenceFiles.map((file: File) => ({
        fileName: file.name,
        uploadDate: new Date()
      }))
    });

    return NextResponse.json({
      success: true,
      message: 'Fraud report submitted successfully',
      data: {
        reportId: momoFraud.reportId,
        status: momoFraud.status
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to submit fraud report',
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

    const reports = await MomoFraud.find({ userId })
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
