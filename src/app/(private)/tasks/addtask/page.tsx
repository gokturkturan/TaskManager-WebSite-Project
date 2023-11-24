"use client";
import TaskForm from "@/components/TaskForm";
import { taskInterface } from "@/interfaces";
import { SetLoading } from "@/redux/loadersSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const AddTask = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();

  const [task, setTask] = useState<taskInterface>({
    title: "",
    description: "",
    status: "Open",
    category: "Personal",
    priority: "Low",
    dateToStart: "",
    dateToFinish: "",
    reference: "",
  });

  const onSave = async () => {
    try {
      dispatch(SetLoading(true));
      await axios.post("/api/tasks", task);
      toast.success("Task added successfully");
      navigate.push("/tasks");
    } catch (error: any) {
      toast.error(error.message || error.response.data.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add Task</h1>
        <button
          className="btn-outlined rounded-md"
          onClick={() => navigate.push("/tasks")}
        >
          Back
        </button>
      </div>
      <TaskForm task={task} setTask={setTask} onSave={onSave} />
    </div>
  );
};

export default AddTask;
