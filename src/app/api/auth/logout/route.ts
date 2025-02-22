import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({
        success: true,
        message: "Logged out successfully"
    });

    // Clear the auth token
    response.cookies.delete('token');

    return response;
}
