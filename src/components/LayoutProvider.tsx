"use client";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetCurrentUser } from "@/redux/usersSlice";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import { SetLoading } from "@/redux/loadersSlice";
import { useRouter } from "next/navigation";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useSelector((state: any) => state.users);
  const { loading } = useSelector((state: any) => state.loaders);

  const pathname = usePathname();
  const dispatch = useDispatch();
  const navigate = useRouter();

  const isPublicRoute = pathname === "/login" || pathname === "/register";

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/users/currentuser");
      dispatch(SetCurrentUser(response.data.data));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const onLogout = async () => {
    try {
      dispatch(SetLoading(true));
      await axios.post("/api/users/logout");
      dispatch(SetCurrentUser(null));
      navigate.push("/login");
      toast.success("Logout Successful");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    if (!isPublicRoute) {
      getData();
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        {loading && <Spinner />}
        <Toaster position="top-center" reverseOrder={false} />

        {isPublicRoute ? (
          <div>{children}</div>
        ) : (
          <>
            <div className="mx-10 bg-primary text-white p-5 flex justify-between items-center rounded-b-lg">
              <h1 className="text-2xl font-bold">Task Manager</h1>
              <div className="flex gap-5">
                <h1 className="underline cursor-pointer">
                  {currentUser?.username}
                </h1>
                <div className="cursor-pointer mt-1" onClick={onLogout}>
                  <IoLogOutOutline />
                </div>
              </div>
            </div>
            <div className="h-[85vh] mx-10 mt-5 p-2 border border-gray-300 rounded-lg">
              {children}
            </div>
          </>
        )}
      </body>
    </html>
  );
};

export default LayoutProvider;
