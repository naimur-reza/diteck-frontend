"use client";
import React from "react";
import { z } from "zod";
import EnaForm from "@/components/forms/EnaForm";
import EnaInput from "@/components/forms/EnaInput";
import { SubmitHandler } from "react-hook-form";

const loginSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const handleLogin: SubmitHandler<{ email: string; password: string }> = async (data) => {
    console.log("Login Data:", data);
    // Handle API call here
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="min-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>

        <EnaForm onSubmit={handleLogin} schema={loginSchema} defaultValues={{ email: "", password: "" }}>
          <EnaInput name="email" type="email" placeholder="Enter your email" className="mb-4" />
          <EnaInput name="password" type="password" placeholder="Enter your password" className="mb-4" />

          <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary cursor-pointer">
            Login
          </button>
        </EnaForm>
      </div>
    </div>
  );
};

export default Login;
