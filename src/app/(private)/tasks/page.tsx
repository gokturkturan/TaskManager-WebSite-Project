import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";
import { taskInterface } from "@/interfaces";
import { cookies } from "next/headers";
import Link from "next/link";

const getTasks = async () => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const endPoint = `${process.env.DOMAIN}/api/tasks`;
    const response = await axios.get(endPoint, {
      headers: { Cookie: `token=${token}` },
    });
    return response.data.data;
  } catch (error) {
    return [];
  }
};

const Tasks = async () => {
  const tasks = await getTasks();

  const getProperty = (key: string, value: any) => (
    <div className="flex flex-col text-sm">
      <span className="text-gray-700 font-semibold">{key}</span>
      <span className="text-gray-600">{value}</span>
    </div>
  );
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <button className="btn-primary rounded-md">
          <Link href={"/tasks/addTask"}>New Task</Link>
        </button>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        {tasks.map((task: taskInterface) => (
          <div
            key={task._id}
            className="p-5 border border-gray-300 rounded-md shadow-md flex flex-col gap-2"
          >
            <h1 className="text-xl text-gray-700">{task.title}</h1>
            <p className="text-gray-600 text-sm">{task.description}</p>

            <hr />

            <div className="grid grid-cols-3 gap-5">
              {getProperty("Status", task.status)}
              {getProperty("Category", task.category)}
              {getProperty("Date to Start", task.dateToStart)}
              {getProperty("Date to Finish", task.dateToFinish)}
              {getProperty("Reference", task.reference)}
              {getProperty("Priority", task.priority)}

              {getProperty(
                "Created At",
                new Date(task.createdAt || "").toLocaleDateString()
              )}
              {getProperty(
                "Updated At",
                new Date(task.updatedAt || "").toLocaleDateString()
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button className="btn-outlined">Delete</button>
              <button className="btn-primary">
                <Link href={`/tasks/edittask?taskId=${task._id}`}>Edit</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
