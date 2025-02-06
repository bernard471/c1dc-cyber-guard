import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User } from '@/models/User';

export async function GET() {
  try {
    await connectDB();
    
    const recentUsers = await User.find()
      .select('name email lastActive')
      .sort({ createdAt: -1 })
      .limit(3);

    const totalUsers = await User.countDocuments();
    
    const formattedUsers = recentUsers.map(user => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      status: user.lastActive ? 'Active' : 'Inactive',
      lastActive: user.lastActive ? new Date(user.lastActive).toISOString().split('T')[0] : 'Never'
    }));

    return NextResponse.json({
      success: true,
      totalUsers,
      recentUsers: formattedUsers
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
    console.error('Error fetching users:', error);
  }
}
