import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const { username, email, password } = await request.json();

        // Check if user exists
        const existingUser = await User.findOne({ 
            $or: [
                { email: email },
                { name: username }
            ]
        });

        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: 'Username or email already exists'
            }, { status: 400 });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({
            name: username,
            email,
            password: hashedPassword,
            createdAt: new Date(),
            lastActive: new Date()
        });

        // You can add email verification here if needed
        // await sendEmail({email, emailType: "VERIFY", userId: newUser._id})
        // Add this after successful user creation:
if (newUser) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
  
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to CyberGuard!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0466c8;">Welcome to CyberGuard, ${username}!</h2>
            <p>Thank you for joining our cybercrime reporting platform.</p>
            <p>With your account, you can now:</p>
            <ul>
              <li>Report various types of cybercrimes</li>
              <li>Track your case progress</li>
              <li>Access educational resources</li>
              <li>Get support when needed</li>
            </ul>
            <p>Stay safe online!</p>
            <div style="margin-top: 20px;">
              <p>Best regards,</p>
              <p>The CyberGuard Team</p>
            </div>
          </div>
        `
      });
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }
  }
  

        return NextResponse.json({
            success: true,
            message: 'User created successfully',
            user: {
                id: newUser._id,
                username: newUser.name,
                email: newUser.email,
                createdAt: newUser.createdAt
            }
        }, { status: 201 });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                success: false,
                message: error.message
            }, { status: 500 });
        }
        return NextResponse.json({
            success: false,
            message: 'An unknown error occurred'
        }, { status: 500 });
    }
}
