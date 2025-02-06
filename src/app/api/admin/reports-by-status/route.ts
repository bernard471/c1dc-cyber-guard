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
        'emergencyreports',
        'crimereports', 
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
  
      let totalActiveReports = 0;
      
      for (const collection of reportCollections) {
        if (!mongoose.connection.db) {
          throw new Error('Database connection not established');
        }
  
        const activeReports = await mongoose.connection.db
          .collection(collection)
          .countDocuments({
            status: { $in: ['under_review', 'in_progress'] }
          });
  
       
        totalActiveReports += activeReports;
      }
  
      console.log('Total active reports:', totalActiveReports);
  
      return NextResponse.json({
        success: true,
        activeReports: totalActiveReports
      });
  
    } catch (error) {
      console.error('Error fetching active reports:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch active reports count' },
        { status: 500 }
      );
    }
  }
  
