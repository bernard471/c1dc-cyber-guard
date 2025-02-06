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
      'whatsapphacks',
      'emergencyreports',
      'crimereports'  // Added emergency reports collection
    ];

    const recentReports = [];
    
    for (const collection of reportCollections) {
      if (!mongoose.connection.db) {
        throw new Error('Database connection not established');
      }
      const reports = await mongoose.connection.db
      .collection(collection)
      .find({}, { projection: { 
        reportId: 1, 
        caseNumber: 1, // Added caseNumber
        createdAt: 1, 
        timestamp: 1, 
        status: 1 
      }})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();
        
      recentReports.push(...reports.map(report => {
        const timestamp = report.timestamp || report.createdAt;
        return {
          id: report.caseNumber || report.reportId, // Use caseNumber if available, fallback to reportId
          type: collection.replace(/s$/, ''),
          status: report.status || 'Pending',
          date: new Date(timestamp).toISOString().split('T')[0],
          timestamp: new Date(timestamp).getTime()
        };
      }));
    }

    const sortedReports = recentReports
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10)
      .map(({ ...report }) => report); // Remove timestamp before sending to client

    return NextResponse.json({
      success: true,
      recentReports: sortedReports
    });
  } catch (error) {
    console.error('Error fetching recent reports:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch recent reports' },
      { status: 500 }
    );
  }
}
