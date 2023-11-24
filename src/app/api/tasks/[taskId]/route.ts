import { connectDB } from "@/config/connectDB";
import { validateJWTGetUserId } from "@/helpers/jwtValidation";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const userId = await validateJWTGetUserId(request);
    const task = await Task.findOne({ user: userId, _id: params.taskId });
    return NextResponse.json({ data: task }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const userId = await validateJWTGetUserId(request);
    const reqBody = await request.json();
    const task = await Task.findOneAndUpdate(
      {
        user: userId,
        _id: params.taskId,
      },
      reqBody,
      { new: true }
    );
    return NextResponse.json({ data: task }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const userId = await validateJWTGetUserId(request);
    await Task.findOneAndDelete({
      user: userId,
      _id: params.taskId,
    });

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
