import { connectDB } from "@/config/connectDB";
import { validateJWTGetUserId } from "@/helpers/jwtValidation";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = validateJWTGetUserId(request);
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("User not found");
    }
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
