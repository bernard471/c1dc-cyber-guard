import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';

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
