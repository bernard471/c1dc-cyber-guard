import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { MomoFraud } from '@/models/MomoFraud';
import { WhatsAppHack } from '@/models/WhatsAppHack';
import { CryptoScam } from '@/models/CryptoScam';
import { OtherFraud } from '@/models/OtherFraud';
import { EmailHack } from '@/models/EmailHack';
import { EmploymentScam } from '@/models/EmploymentScam';
import { FinancialFraud } from '@/models/FinancialFraud';
import { IdentityTheft } from '@/models/IdentityTheft';
import { LocationTracking } from '@/models/LocationTracking';
import { Sextortion } from '@/models/Sextortion';
import { ShoppingScam } from '@/models/ShoppingScam';
import { SocialMediaHack} from '@/models/SocialAccountHack';
import EmergencyReport from '@/models/EmergencyReport';
import { getDataFromToken } from '@/helpers/getdatafromtoken';
import { getToken } from "next-auth/jwt";
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    let userId;
    
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
      userId = await getDataFromToken(request);
    }

    const [
      momoUpdates,
      whatsappUpdates,
      cryptoScamUpdates,
      emailHackUpdates,
      employmentScamUpdates,
      financialFraudUpdates,
      identityTheftUpdates,
      locationTrackingUpdates,
      otherFraudUpdates,
      sextortionUpdates,
      shoppingScamUpdates,
      socialAccountUpdates,
      emergencyUpdates
    ] = await Promise.all([
      MomoFraud.find(
        { userId, statusMessage: { $exists: true, $ne: '' } },
        'reportId status statusMessage updatedAt'
      ).sort({ updatedAt: -1 }),
      
      WhatsAppHack.find(
        { userId, statusMessage: { $exists: true, $ne: '' } },
        'reportId status statusMessage updatedAt'
      ).sort({ updatedAt: -1 }),

      CryptoScam.find(
        { userId, statusMessage: { $exists: true, $ne: '' } },
        'reportId status statusMessage updatedAt'
      ).sort({ updatedAt: -1 }),

      EmailHack.find(
        { userId, statusMessage: { $exists: true, $ne: '' } },
        'reportId status statusMessage updatedAt'
      ).sort({ updatedAt: -1 }),

      EmploymentScam.find(
        { userId, statusMessage: { $exists: true, $ne: '' } },
        'reportId status statusMessage updatedAt'
      ).sort({ updatedAt: -1 }),

      FinancialFraud.find(
        { userId, statusMessage: { $exists: true, $ne: '' } },
        'reportId status statusMessage updatedAt'
      ).sort({ updatedAt: -1 }),

      IdentityTheft.find(
        { userId, statusMessage: { $exists: true, $ne: '' } },
        'reportId status statusMessage updatedAt'
      ).sort({ updatedAt: -1 }),

      LocationTracking.find(
        { userId, statusMessage: { $exists: true, $ne: '' } },
        'reportId status statusMessage updatedAt'
      ).sort({ updatedAt: -1 }),

      OtherFraud.find(
        { userId, statusMessage: { $exists: true, $ne: '' } },
        'reportId status statusMessage updatedAt'
      ).sort({ updatedAt: -1 }),

      Sextortion.find(
        { userId, statusMessage: { $exists: true, $ne: '' } },
        'reportId status statusMessage updatedAt'
      ).sort({ updatedAt: -1 }),

      ShoppingScam.find(
        { userId, statusMessage: { $exists: true, $ne: '' } },
        'reportId status statusMessage updatedAt'
      ).sort({ updatedAt: -1 }),

      SocialMediaHack.find(
        { userId, statusMessage: { $exists: true, $ne: '' } },
        'reportId status statusMessage updatedAt'
      ).sort({ updatedAt: -1 }),

      EmergencyReport.find( // Add this query
        { userId, statusMessage: { $exists: true, $ne: '' } },
        'caseNumber status statusMessage updatedAt'
      ).sort({ updatedAt: -1 })
    ]);
    const allUpdates = [
      ...momoUpdates,
      ...whatsappUpdates,
      ...cryptoScamUpdates,
      ...emailHackUpdates,
      ...employmentScamUpdates,
      ...financialFraudUpdates,
      ...identityTheftUpdates,
      ...locationTrackingUpdates,
      ...otherFraudUpdates,
      ...sextortionUpdates,
      ...shoppingScamUpdates,
      ...socialAccountUpdates,
      ...emergencyUpdates
    ].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    return NextResponse.json({ 
      success: true, 
      data: allUpdates
    });

  } catch (error) {
    console.error('Error fetching status updates:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch status updates'
    }, { status: 500 });
  }
}