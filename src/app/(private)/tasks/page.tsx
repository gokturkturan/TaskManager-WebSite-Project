"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { taskInterface } from "@/interfaces";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/loadersSlice";

const Tasks = ({ searchParams }: { searchParams: any }) => {
  const navigate = useRouter();
  const dispatch = useDispatch();

  const [tasks, setTasks] = useState<taskInterface[] | undefined>();

  const getTasks = async (searchParams = {}) => {
    try {
      const searchParamsString = new URLSearchParams(searchParams).toString();
      const response = await axios.get(`/api/tasks` + "?" + searchParamsString);
      setTasks(response.data.data);
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    console.log(searchParams);
    getTasks(searchParams);
  }, []);

  const onDelete = async (task: taskInterface) => {
    try {
      dispatch(SetLoading(true));
      await axios.delete(`/api/tasks/${task._id}`);
      toast.success("Task deleted successfully");
    } catch (error: any) {
      toast.error(error.message || error.response.data.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const clearFilter = async () => {
    navigate.push("/tasks");
    await getTasks();
  };

  const getProperty = (key: string, value: any) => (
    <div className="flex flex-col text-sm">
      <span className="text-gray-700 font-semibold">{key}</span>
      <span className="text-gray-600">{value}</span>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">
          {(searchParams.status || searchParams.priority) && tasks?.length}{" "}
          Tasks
        </h1>
        <div>
          {(searchParams.status || searchParams.priority) && (
            <button
              className="btn-primary rounded-md mr-2"
              onClick={clearFilter}
            >
              Clear Filter
            </button>
          )}
          <button
            className="btn-primary rounded-md"
            onClick={() => navigate.push("/tasks/addtask")}
          >
            New Task
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        {tasks?.map((task: taskInterface) => (
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
              <button
                className="btn-outlined rounded-md"
                onClick={() => onDelete(task)}
              >
                Delete
              </button>
              <button className="btn-primary rounded-md">
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
