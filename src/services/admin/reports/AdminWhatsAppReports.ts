import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';

export async function updateWhatsAppReportStatus(reportId: string, newStatus: string) {
  try {
    await connectDB();
    const result = await mongoose.connection.collection('whatsapp_reports').updateOne(
      { reportId: reportId },
      { $set: { status: newStatus } }
    );
    return result;
  } catch (error) {
    throw new Error(`Failed to update report status: ${error}`);
  }
}

export async function fetchAllWhatsAppReports() {
  try {
    await connectDB();
    const reports = await mongoose.connection.collection('whatsapp_reports')
      .find({})
      .sort({ dateCreated: -1 })
      .toArray();
    return reports;
  } catch (error) {
    throw new Error(`Failed to fetch reports: ${error}`);
  }
}

export async function fetchWhatsAppReportById(reportId: string) {
  try {
    await connectDB();
    const report = await mongoose.connection.collection('whatsapp_reports')
      .findOne({ reportId: reportId });
    return report;
  } catch (error) {
    throw new Error(`Failed to fetch report: ${error}`);
  }
}
