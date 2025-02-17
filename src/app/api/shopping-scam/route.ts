import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { ShoppingScam } from '@/models/ShoppingScam';
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
    
    const reportId = `SS-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    const shoppingScamReport = await ShoppingScam.create({
      ...data,
      reportId,
      userId,
      status: 'pending',
      dateOfIncident: new Date(data.dateOfIncident),
      evidenceFiles: data.evidenceFiles.map((file: File) => ({
        fileName: file.name,
        uploadDate: new Date()
      })),
      orderDetails: {
        ...data.orderDetails,
        amountLost: data.orderDetails?.amountLost ? parseFloat(data.orderDetails.amountLost) : null,
        deliveryPromised: data.orderDetails?.deliveryPromised ? new Date(data.orderDetails.deliveryPromised) : null
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Shopping scam report submitted successfully',
      data: {
        reportId: shoppingScamReport.reportId,
        status: shoppingScamReport.status
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to submit shopping scam report',
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

    const reports = await ShoppingScam.find({ userId })
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
