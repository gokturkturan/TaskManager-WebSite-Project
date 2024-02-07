"use client";
import TaskForm from "@/components/TaskForm";
import { taskInterface } from "@/interfaces";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { SetLoading } from "@/redux/loadersSlice";

const EditTask = () => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");

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
      await axios.put(`/api/tasks/${taskId}`, task);
      toast.success("Task updated successfully");
      navigate.push("/tasks");
    } catch (error: any) {
      toast.error(error.message || error.response.data.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const getTask = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/tasks/${taskId}`);
      setTask(response.data.data);
    } catch (error: any) {
      toast.error(error.response.data.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    getTask();
  }, [taskId]);

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
      <TaskForm task={task} setTask={setTask} onSave={onSave} />
    </div>
  );
};

export default EditTask;
