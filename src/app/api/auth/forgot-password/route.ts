import { NextResponse } from 'next/server';
import { User } from '@/models/User';
import connectDB from '@/lib/mongodb';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email } = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: 'If a user exists with this email, they will receive a password reset link' 
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // Send reset email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request - CyberGuard',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0466c8;">Reset Your Password</h2>
          <p>You requested a password reset for your CyberGuard account.</p>
          <p>Click the button below to reset your password. This link is valid for 1 hour.</p>
          <div style="margin-top: 20px;">
            <a href="${resetUrl}" 
               style="background-color: #0466c8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              Reset Password
            </a>
          </div>
          <p style="margin-top: 20px;">If you didn't request this, please ignore this email.</p>
        </div>
      `
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Password reset link sent successfully' 
    });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Error processing request' 
    }, { status: 500 });
    console.error(error);
  }
}
