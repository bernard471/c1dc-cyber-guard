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
      'emergencyreports'  // Added emergency reports collection
    ];

    const counts = await Promise.all(
      reportCollections.map(async collection => {
        if (!mongoose.connection.db) {
          throw new Error('Database connection not established');
        }
        const count = await mongoose.connection.db.collection(collection).countDocuments();
        return count;
      })
    );

    const totalReports = counts.reduce((sum, count) => sum + count, 0);

    return NextResponse.json({
      success: true,
      totalReports
    });
  } catch (error) {
    console.error('Error fetching total reports:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch total reports' },
      { status: 500 }
    );
  }
}
