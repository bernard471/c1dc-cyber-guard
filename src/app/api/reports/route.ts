import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Report } from '@/models/Report';
import { User } from '@/models/User';
import { MomoFraud } from '@/models/MomoFraud';
import { Sextortion } from '@/models/Sextortion';
import { WhatsAppHack } from '@/models/WhatsAppHack';
import { SocialMediaHack } from '@/models/SocialAccountHack';
import { EmailHack } from '@/models/EmailHack';
import { LocationTracking } from '@/models/LocationTracking';
import { IdentityTheft } from '@/models/IdentityTheft';
import { ShoppingScam } from '@/models/ShoppingScam';
import { CryptoScam } from '@/models/CryptoScam';
import { EmploymentScam } from '@/models/EmploymentScam';
import { FinancialFraud } from '@/models/FinancialFraud';
import { OtherFraud } from '@/models/OtherFraud';

const MODEL_MAP = {
  momo: MomoFraud,
  sextortion: Sextortion,
  whatsapp: WhatsAppHack,
  social: SocialMediaHack,
  email: EmailHack,
  stalking: LocationTracking,
  identity: IdentityTheft,
  shopping: ShoppingScam,
  crypto: CryptoScam,
  employment: EmploymentScam,
  finance: FinancialFraud,
  Other: OtherFraud
};

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    
    const caseNumber = `CR-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    
    // Handle user creation/update for non-anonymous reports
    let userId = null;
    if (!data.contactInfo.isAnonymous) {
      const user = await User.findOneAndUpdate(
        { email: data.contactInfo.email },
        {
          name: data.contactInfo.name,
          phone: data.contactInfo.phone,
          contactPreference: data.contactInfo.contactPreference,
          lastActive: new Date()
        },
        { upsert: true, new: true }
      );
      userId = user._id;
    }

    // Get the appropriate model for the crime type
    const CrimeModel = MODEL_MAP[data.selectedCrime as keyof typeof MODEL_MAP];
    
    // Create the specific crime record
    const crimeDetails = await CrimeModel.create(data.crimeData);

    // Create the main report record
    const report = await Report.create({
      caseNumber,
      reportType: data.selectedCrime,
      userId,
      reportData: {
        crimeDetails: crimeDetails._id,
        crimeType: data.selectedCrime,
        contactInfo: data.contactInfo
      },
      status: 'pending',
      priority: 'medium',
      timeline: [{
        action: 'Report Created',
        timestamp: new Date(),
        note: 'Initial report submission'
      }]
    });

    // Update user's reports array if not anonymous
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        $push: { reports: report._id }
      });
    }

    return NextResponse.json({
      success: true,
      caseNumber,
      reportId: report._id,
      message: 'Report submitted successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Report submission error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process report',
    }, { status: 500 });
  }
}
