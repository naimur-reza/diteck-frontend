/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Link from "next/link";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { requestPasswordReset } from "./action";
import { EnaForm, EnaInput } from "@/components/forms";
import { FieldValues } from "react-hook-form";

const forgetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await requestPasswordReset(data?.email);

      if (result.success) {
        setShowModal(true);
        toast.success("Password reset email sent");
      } else {
        setError(result.error || "Something went wrong");
        toast.error(result.error || "Failed to send reset email");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      toast.error("Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-center">
            Forgot Password
          </h1>
          <p className="text-sm font-medium text-primary text-center">
            Enter your email to recover your account.
          </p>
        </div>

        {!showModal && (
          <EnaForm
            onSubmit={handleSubmit}
            schema={forgetPasswordSchema}
            defaultValues={{
              email: "",
            }}
          >
            <EnaInput
              name="email"
              type="email"
              placeholder="Enter your email"
              className="mb-4"
            />

            {error && <p className="text-sm text-red-500 mt-2 mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-hover cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Reset Password"}
            </button>
          </EnaForm>
        )}

        {showModal && (
          <div className="text-left p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">
              Please check your email
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              A password recovery link has been sent to your email address.
              Please follow the instructions in the email to reset your
              password. If you did not receive the email, you can try again.
            </p>
            <Button
              className="mt-4 bg-primary text-white hover:bg-primary-hover"
              onClick={() => setShowModal(false)}
            >
              Try Again
            </Button>
          </div>
        )}

        <div className="mt-4 text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
