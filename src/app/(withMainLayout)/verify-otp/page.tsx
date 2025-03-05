"use client";

import { useState } from "react";
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

const VerifyOtp = () => {
  const [value, setValue] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const onSubmit = async () => {
    if (value.length === 6) {
      // Implement your OTP verification logic here
      console.log("Verifying OTP:", value);
      // If successful, redirect to the success page
      // router.push("/success");
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
              onChange={(value) => setValue(value)}
              className="gap-2"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="rounded-md border-2" />
                <InputOTPSlot index={1} className="rounded-md border-2" />
                <InputOTPSlot index={2} className="rounded-md border-2" />
                <InputOTPSlot index={3} className="rounded-md border-2" />
                <InputOTPSlot index={4} className="rounded-md border-2" />
                <InputOTPSlot index={5} className="rounded-md border-2" />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {value === "" ? (
              <>Enter the 6-digit code sent to your email.</>
            ) : (
              <>You entered: {value}</>
            )}
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={onSubmit}
            className="w-full"
            disabled={value.length !== 6}
          >
            Verify Email
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Did not receive the code?{" "}
            <Button variant="link" className="p-0 h-auto font-normal">
              Resend
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyOtp;
