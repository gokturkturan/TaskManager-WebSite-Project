"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const isLoginButtonDisabled = () => {
    return !user.password || !user.email;
  };

  const onLogin = async () => {
    try {
      setLoading(true);
      await axios.post(`/api/users/login`, user);
      toast.success("Logged in successfully!");
      navigate.push("/");
    } catch (error: any) {
      toast.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col gap-5 bg-white p-5 w-[500px] text-gray-700">
        <h1 className="text-2xl font-bold uppercase">Login</h1>
        <hr />
        <div className="flex flex-col">
          <label className="text-sm">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            value={user.password}
          />
        </div>
        <button
          className={
            isLoginButtonDisabled()
              ? "btn-disabled cursor-not-allowed"
              : "btn-primary"
          }
          onClick={onLogin}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div>
          Dont have an account yet?{" "}
          <Link
            href={"/register"}
            className="text-primary font-semibold underline"
          >
            Register
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default Login;
