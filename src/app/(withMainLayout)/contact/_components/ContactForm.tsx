"use client";

import { useCreateRequestQueryMutation } from "@/redux/api/adminApi/queryApi/queryApi";
import { error } from "@/types";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const ContactForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [requestQuery, { isLoading }] = useCreateRequestQueryMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await requestQuery({ email: data?.email }).unwrap();
      if (response?.success) {
        toast.success(response?.message);
        router.push(`/verify-otp?email=${data.email}`);
      }
    } catch (error) {
      toast.error(
        (error as error)?.data?.message ||
          "You already have a pending query. Please wait until it is resolved."
      );
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
        className={`${inputStyle} bg-primary col-span-2 hover:bg-primary/90 transition-colors cursor-pointer text-white disabled:opacity-50`}
        type="submit"
        value={isLoading ? "Submitting..." : "Submit"}
        disabled={isLoading}
      />
    </form>
  );
};

export default ContactForm;
const inputStyle = "rounded px-4 py-3 rounded-2xl focus:outline-none w-full";
