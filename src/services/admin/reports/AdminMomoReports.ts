import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';

export async function updateReportStatus(reportId: string, newStatus: string) {
  try {
    await connectDB();
    const result = await mongoose.connection.collection('reports').updateOne(
      { reportId: reportId },
      { $set: { status: newStatus } }
    );
    return result;
  } catch (error) {
    throw new Error(`Failed to update report status: ${error}`);
  }
}


export async function fetchAllReports() {
  try {
    await connectDB();
    const reports = await mongoose.connection.collection('reports')
      .find({})
      .sort({ dateCreated: -1 })
      .toArray();
    return reports;
  } catch (error) {
    throw new Error(`Failed to fetch reports: ${error}`);
  }
}
