import { validateJWTGetUserId } from "@/helpers/jwtValidation";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = await validateJWTGetUserId(request);
    const tasks = await Task.find({ user: userId });
    let resultData = {
      //STATUS LEVEL
      totalTasks: tasks.length,
      inProgressTasks: tasks.filter((task) => task.status === "In Progress")
        .length,
      completedTasks: tasks.filter((task) => task.status === "Done").length,
      openTasks: tasks.filter((task) => task.status === "Open").length,
      // PRIORITY LEVEL
      highPriority: tasks.filter((task) => task.priority === "High").length,
      mediumPriority: tasks.filter((task) => task.priority === "Medium").length,
      lowPriority: tasks.filter((task) => task.priority === "Low").length,
    };
    return NextResponse.json({ data: resultData }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}
