"use client";
import TaskForm from "@/components/TaskForm";
import { taskInterface } from "@/interfaces";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EditTask = () => {
  const navigate = useRouter();

  const [task, setTask] = useState<taskInterface>({
    title: "",
    description: "",
    status: "OPEN",
    category: "PERSONAL",
    priority: "LOW",
    dateToStart: "",
    dateToFinish: "",
    reference: "",
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Task</h1>
        <button
          className="btn-outlined rounded-md"
          onClick={() => navigate.push("/tasks")}
        >
          Back
        </button>
      </div>
      <TaskForm task={task} setTask={setTask} />
    </div>
  );
};

export default EditTask;
