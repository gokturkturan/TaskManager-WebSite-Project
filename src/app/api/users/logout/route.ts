import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/connectDB";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      {
        message: "User Logout Successfully",
      },
      { status: 200 }
    );

    response.cookies.set("token", "");

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
