"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, ArrowRight } from "lucide-react";
import { useVerifyOTPMutation } from "@/redux/api/otpApi/otpApi";
import { toast } from "sonner";
import { error } from "@/types";
import { useRequestJobApplicationMutation } from "@/redux/api/adminApi/jobApplicationApi/JobApplicationApi.api";

const VerifyJobApplication = () => {
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOTPMutation();
  const [requestJobApplication, { isLoading: isRequesting }] =
    useRequestJobApplicationMutation();

  const [value, setValue] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const slug = searchParams.get("slug");
  const jobId = searchParams.get("jobId");

  useEffect(() => {
    if (!email || !jobId || !slug) {
      router.push("/");
    }
  }, [email, router, jobId, slug]);

  const handleVerify = async () => {
    if (value.length === 6 && email) {
      try {
        const response = await verifyOtp({ email, otp: value }).unwrap();
        if (response.success) {
          setValue("");
          toast.success(
            "OTP Verified Successfully and redirected to submit your jop application"
          );
          router.push(
            `/career/${slug}?email=${email}&verified=true&jobId=${jobId}`
          );
        }
      } catch (error) {
        toast.error((error as error)?.data?.message || "Verification failed");
      }
    }
  };

  const handleResend = async () => {
    if (email && jobId) {
      setValue("");
      try {
        await requestJobApplication({ data: { email }, jobId }).unwrap();
        toast.success("OTP Resent Successfully");
      } catch (error) {
        toast.error((error as error)?.data?.message || "Failed to resend OTP");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F2F1F6]">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Verify Your Email
          </CardTitle>
          <p className="text-center text-muted-foreground">
            We have sent a code to {email || "your email"}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <Mail className="h-12 w-12 text-primary" />
          </div>
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={setValue}
              className="gap-2"
            >
              <InputOTPGroup className="space-x-2">
                {[...Array(6)].map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="rounded-md border-2 size-12"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {value === ""
              ? "Enter the 6-digit code sent to your email."
              : `You entered: ${value}`}
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={handleVerify}
            className="w-full"
            disabled={value.length !== 6 || isVerifying}
          >
            {isVerifying ? "Verifying..." : "Verify Email"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Did not receive the code?{" "}
            <Button
              onClick={handleResend}
              variant="link"
              className="p-0 h-auto font-normal"
              disabled={isRequesting}
            >
              {isRequesting ? "Resending..." : "Resend"}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyJobApplication;
