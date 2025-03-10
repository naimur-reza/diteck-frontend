/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as z from "zod";
import { toast } from "sonner";
import { resetPassword } from "./action";
import { EnaForm, EnaInput } from "@/components/forms";
import { FieldValues } from "react-hook-form";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password is too long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    const tokenParam = searchParams.get("token");

    if (!emailParam || !tokenParam) {
      setError("Invalid or expired password reset link");
      setIsValid(false);
      return;
    }

    setEmail(emailParam);
    setToken(tokenParam);
    setIsValid(true);
  }, [searchParams]);

  const handleSubmit = async (data: FieldValues) => {
    if (!email || !token) {
      setError("Missing required parameters");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await resetPassword({
        email,
        token,
        newPassword: data.password,
      });

      if (result.success) {
        toast.success("Password has been reset successfully");
        dispatch(logout());
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        setError(result.error || "Failed to reset password");
        toast.error(result.error || "Failed to reset password");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      toast.error("Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-lg">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-center">
              Reset Password
            </h1>
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p>{error || "Invalid or expired password reset link"}</p>
              <button
                onClick={() => router.push("/forget-password")}
                className="mt-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Request a new password reset link
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-center">
            Reset Password
          </h1>
          <p className="text-sm font-medium text-primary text-center">
            Enter your new password below
          </p>
        </div>

        <EnaForm
          onSubmit={handleSubmit}
          schema={resetPasswordSchema}
          defaultValues={{
            password: "",
            confirmPassword: "",
          }}
        >
          <EnaInput
            name="password"
            type="password"
            placeholder="Enter new password"
            className="mb-4"
          />
          <EnaInput
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            className="mb-4"
          />

          {error && <p className="text-sm text-red-500 mt-2 mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-hover cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Resetting Password..." : "Reset Password"}
          </button>
        </EnaForm>

        <div className="mt-4 text-center">
          <button
            onClick={() => router.push("/login")}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
