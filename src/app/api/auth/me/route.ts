import { getDataFromToken } from "@/helpers/getdatafromtoken";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const userId = await getDataFromToken(request);
        
        const user = await User.findById(userId).select("-password");
        
        if (!user) {
            return NextResponse.json({ 
                success: false,
                message: "User not found" 
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
        
    } catch (error: unknown) {
        console.error('Auth error:', error);
        return NextResponse.json({ 
            success: false,
            message: "Authentication failed" 
        }, { status: 401 });
    }
}

