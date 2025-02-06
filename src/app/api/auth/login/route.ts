import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const { email, password } = await request.json();

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'Invalid credentials'
            }, { status: 401 });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({
                success: false,
                message: 'Invalid credentials'
            }, { status: 401 });
        }

        // Create token payload

        // Sign JWT token
        const token = jwt.sign(
          { userId: user._id },  // Make sure this matches what getDataFromToken expects
          process.env.JWT_SECRET || 'fallback-secret-key',
          { expiresIn: '24h' }
        );
        
        // Update last active timestamp
        await User.findByIdAndUpdate(user._id, {
            lastActive: new Date()
        });

        // Create response with cookie
        const response = NextResponse.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

        // Set secure cookie
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 // 24 hours
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({
            success: false,
            message: 'Login failed'
        }, { status: 500 });
    }
}
