import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { getDataFromToken } from '@/helpers/getdatafromtoken';
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    let userId;
    
    // Check for NextAuth session first
    const session = await getToken({ 
      req: request, 
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
      userId = getDataFromToken(request);
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    
    const reportCollections = [
      'cryptoscams',
      'emailhacks',
      'employmentscams', 
      'financialfrauds',
      'identitythefts',
      'locationtrackings',
      'momofrauds',
      'otherfrauds',
      'sextortions',
      'shoppingscams',
      'socialmediahacks',
      'whatsapphacks',
      'emergencyreports'
    ];

    const recentReports = [];
    
    for (const collection of reportCollections) {
      
      if (!mongoose.connection.db) {
        console.error('❌ Database connection not established');
        throw new Error('Database connection not established');
      }

      const reports = await mongoose.connection.db
        .collection(collection)
        .find(
            { userId: userObjectId },  // Use the converted ObjectId
            { 
            projection: { 
              reportId: 1, 
              caseNumber: 1,
              createdAt: 1, 
              timestamp: 1, 
              status: 1 
            }
          }
        )
        .sort({ createdAt: -1 })
        .limit(5)
        .toArray();

      
      const mappedReports = reports.map(report => ({
        id: report.caseNumber || report.reportId,
        type: collection.replace(/s$/, ''),
        status: report.status || 'Pending',
        date: new Date(report.timestamp || report.createdAt).toISOString().split('T')[0],
        timestamp: new Date(report.timestamp || report.createdAt).getTime()
      }));

      recentReports.push(...mappedReports);
    }

    const sortedReports = recentReports
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ timestamp, ...report }) => report);



    return NextResponse.json({
      success: true,
      data: sortedReports
    });
  } catch (error) {
    console.error('🚨 Error details:', {
      name: error instanceof Error ? error.name : 'Unknown error',
      message: error instanceof Error ? error.message : 'An unknown error occurred',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user reports' },
      { status: 500 }
    );
  }
}