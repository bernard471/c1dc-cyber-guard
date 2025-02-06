import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    return decodedToken.userId;
  } catch (error: unknown) {
    throw new Error("Invalid token");
    console.error("Error in getDataFromToken:", error);
  }
};
