import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    await connectDB();
    
    const collections = [
      'cryptoscams',
      'emailhacks',
      'emergencyreports',  // This collection needs special handling
      'employmentscams', 
      'financialfrauds',
      'identitythefts',
      'locationtrackings',
      'momofrauds',
      'otherfrauds',
      'reports',
      'sextortions',
      'shoppingscams',
      'socialmediahacks',
      'whatsapphacks'
    ];

    const allReports = await Promise.all(
      collections.map(async (collectionName) => {
        const collection = mongoose.connection.collection(collectionName);
        
       
        const reports = await collection.find({
          userId: new mongoose.Types.ObjectId(userId)
        }).toArray();
        
        
        return reports.map(report => {
          if (collectionName === 'emergencyreports') {
            
            return {
              reportId: report._id.toString(),
              type: 'EMERGENCY',
              status: report.status || 'pending',
              createdAt: report.createdAt || report.timestamp || new Date(),
              description: report.description || 'No description provided',
              severity: report.severity,
              caseNumber: report.caseNumber,
              name: report.name,
              contact: report.contact,
              location: report.location
            };
          }

          // Standard handling for other reports
          return {
            reportId: report._id.toString(),
            type: collectionName.replace(/s$/, '').toUpperCase(),
            status: report.status || 'pending',
            createdAt: report.timestamp || report.createdAt || new Date(),
            description: report.description || 'No description provided'
          };
        });
      })
    );

    const flattenedReports = allReports.flat();
    console.log('Total reports found:', flattenedReports.length);

    return NextResponse.json({
      success: true,
      reports: flattenedReports
    });
  } catch (error) {
    console.error('Error fetching user reports:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user reports' },
      { status: 500 }
    );
  }
}
