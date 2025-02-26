/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { z } from "zod";
import { FieldValues } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import EnaForm from "@/components/forms/EnaForm";
import EnaInput from "@/components/forms/EnaInput";
import { useLoginUserMutation } from "@/redux/api/authApi/authApi";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (data: FieldValues) => {
    try {
      const response = await loginUser(data).unwrap();
      // Store user data in Redux
      dispatch(setUser(response));
      // Success toast
      toast.success("Login Successful! Redirecting...");
      // Redirect to dashboard after short delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: any) {
      console.error("Login Error:", err);
      const errorMessage = err?.data?.message || "Invalid email or password.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="min-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>

        <EnaForm
          onSubmit={handleLogin}
          schema={loginSchema}
          defaultValues={{ email: "", password: "" }}
        >
          <EnaInput
            name="email"
            type="email"
            placeholder="Enter your email"
            className="mb-4"
          />
          <EnaInput
            name="password"
            type="password"
            placeholder="Enter your password"
            className="mb-4"
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-hover cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </EnaForm>
      </div>
    </div>
  );
};

export default Login;
