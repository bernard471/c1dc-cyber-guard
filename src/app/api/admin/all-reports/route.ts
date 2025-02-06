import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectDB();
    
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
      'whatsapphacks'
    ];

    const allReports = [];
    
    for (const collection of reportCollections) {
      if (!mongoose.connection.db) {
        throw new Error('Database connection not established');
      }
      const reports = await mongoose.connection.db
        .collection(collection)
        .find({}, { projection: { reportId: 1, createdAt: 1, timestamp: 1, status: 1 } })
        .sort({ timestamp: -1, createdAt: -1 })
        .toArray();
        
      allReports.push(...reports.map(report => {
        const timestamp = report.timestamp || report.createdAt;
        return {
          id: report.reportId,
          type: collection.replace(/s$/, ''),
          status: report.status || 'Pending',
          date: new Date(timestamp).toISOString().split('T')[0],
          timestamp: new Date(timestamp).getTime()
        };
      }));
    }

    const sortedReports = allReports
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(({ ...report }) => report); // Remove timestamp before sending to client

    return NextResponse.json({
      success: true,
      reports: sortedReports
    });
  } catch (error) {
    console.error('Error fetching all reports:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}
