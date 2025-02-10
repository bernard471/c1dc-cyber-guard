import { NextResponse } from 'next/server';
import { User } from '@/models/User';
import connectDB from '@/lib/mongodb';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { token, password } = await request.json();

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: 'Password reset token is invalid or has expired' 
      }, { status: 400 });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Successful - CyberGuard',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0466c8;">Password Reset Successful</h2>
          <p>Your password has been successfully reset.</p>
          <p>If you didn't make this change, please contact our support team immediately.</p>
        </div>
      `
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Password reset successful' 
    });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Error resetting password' 
    }, { status: 500 });
    console.error(error);
  }
}
