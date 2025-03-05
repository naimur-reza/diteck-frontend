"use client";

import { useVerifyOtpMutation } from "@/redux/api/authApi"; // Import the API hook
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const VerifyOtp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [verifyOtp, { isLoading, isError, isSuccess, error }] =
    useVerifyOtpMutation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const onSubmit = async (data: { otp: string }) => {
    const response = await verifyOtp({ email, otp: data.otp }).unwrap();
    if (response?.success) {
      console.log(response);
      //   router.push("/success"); // Redirect after successful OTP verification
    }
  };

  return <></>;
};

export default VerifyOtp;
