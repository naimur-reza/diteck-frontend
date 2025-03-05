"use client";

import { useCreateRequestQueryMutation } from "@/redux/api/adminApi/queryApi/queryApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";

const ContactForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [requestQuery, { isLoading, isError, isSuccess, data, error }] =
    useCreateRequestQueryMutation();

  const onSubmit = async (data: FieldValues) => {
    const response = await requestQuery({ email: data?.email }).unwrap();
    if (response?.success) {
      router.push(`/verify-otp?email=${data.email}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-4 col-span-3"
    >
      <input
        {...register("name", { required: "Name is required" })}
        className={`${inputStyle} bg-white`}
        type="text"
        placeholder="Name"
      />
      {errors.name && (
        <p className="text-red-500 col-span-2">
          {errors?.name?.message?.toString()}
        </p>
      )}

      <input
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email",
          },
        })}
        className={`${inputStyle} bg-white`}
        type="email"
        name="email"
        placeholder="Email"
      />
      {errors.email && (
        <p className="text-red-500 col-span-2">
          {errors?.email?.message?.toString()}
        </p>
      )}

      <input
        {...register("subject", { required: "Subject is required" })}
        className={`${inputStyle} bg-white col-span-2`}
        type="text"
        placeholder="Subject"
      />
      {errors.subject && (
        <p className="text-red-500 col-span-2">
          {errors?.subject?.message?.toString()}
        </p>
      )}

      <textarea
        {...register("message", { required: "Message is required" })}
        className={`${inputStyle} bg-white col-span-2`}
        placeholder="Message"
      />
      {errors.message && (
        <p className="text-red-500 col-span-2">
          {errors.message.message?.toString()}
        </p>
      )}

      <input
        className={`${inputStyle} bg-primary col-span-2 hover:bg-primary/90 transition-colors cursor-pointer text-white`}
        type="submit"
        value="Submit"
      />
    </form>
  );
};

export default ContactForm;
const inputStyle = "rounded  px-4 py-3 rounded-2xl focus:outline-none w-full  ";
