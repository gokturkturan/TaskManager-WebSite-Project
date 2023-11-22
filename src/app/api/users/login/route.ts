import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/connectDB";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const userExists = await User.findOne({ email: reqBody.email });
    if (!userExists) {
      throw new Error("User does not exist");
    }

    const arePasswordsSame = await bcrypt.compare(
      reqBody.password,
      userExists.password
    );

    if (!arePasswordsSame) {
      throw new Error("Invalid Credentials");
    }

    const token = jwt.sign(
      { userId: userExists._id },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    const response = NextResponse.json(
      {
        message: "User Logged in Successfully",
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
