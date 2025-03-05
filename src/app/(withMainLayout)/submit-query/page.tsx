/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCreateQueryMutation } from "@/redux/api/adminApi/queryApi/queryApi";
import { querySchema } from "@/schema/querySchema";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CheckCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SubmitQuery = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const verified = searchParams.get("verified");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [createQuery, { isLoading, isSuccess, isError, data, error }] =
    useCreateQueryMutation();

  const inputStyle = "rounded px-4 py-3 rounded-2xl focus:outline-none w-full";
  const errorStyle = "text-red-500 text-sm mt-1";
  const selectStyle = `${inputStyle} bg-white`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(querySchema),
    defaultValues: {
      email: email || "",
    },
  });

  useEffect(() => {
    if (!email || verified !== "true") {
      toast.error("Unauthorized access");
      router.push("/");
    }
  }, [email, verified, router]);

  useEffect(() => {
    if (isSuccess) {
      setIsSubmitted(true);
      toast.success("Query submitted successfully!");
    }

    if (isError && error) {
      if ("data" in error) {
        toast.error((error.data as any)?.message || "Failed to submit query");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  }, [isSuccess, isError, error]);

  const onSubmit = async (formData: any) => {
    try {
      await createQuery(formData).unwrap();
    } catch (err) {
      console.error("Error submitting query:", err);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-b from-blue-50 to-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Thank You for Your Query!
          </h2>
          <p className="text-gray-600 mb-6">
            Your message has been successfully submitted to Ena Ema Technology.
            Our team will review your request and get back to you shortly via
            your preferred contact method.
          </p>
          <div className="p-4 bg-blue-50 rounded-md border border-blue-100 mb-6">
            <p className="text-sm text-blue-700">
              Reference ID:{" "}
              {data?.data?._id ||
                "ENA-" +
                  Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center  py-10">
      <div className="max-w-5xl w-full  p-8 rounded-lg ">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Submit Your Query to Ena Ema Technology
          </h1>
          <p className="text-gray-600 mt-2">
            Please fill out the form below and our team will get back to you as
            soon as possible.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <input
                {...register("fullName")}
                id="fullName"
                className={`${inputStyle} bg-white`}
                type="text"
                placeholder="Full Name"
              />
              {errors.fullName && (
                <p className={errorStyle}>
                  {errors.fullName.message?.toString()}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                {...register("email")}
                id="email"
                className={`${inputStyle} bg-white`}
                type="email"
                placeholder="Email"
                readOnly
              />
              {errors.email && (
                <p className={errorStyle}>{errors.email.message?.toString()}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <input
                {...register("phoneNumber")}
                id="phoneNumber"
                className={`${inputStyle} bg-white`}
                type="text"
                placeholder="Phone Number"
              />
              {errors.phoneNumber && (
                <p className={errorStyle}>
                  {errors.phoneNumber.message?.toString()}
                </p>
              )}
            </div>

            {/* Contact Method */}
            <div>
              <select
                {...register("contactMethod")}
                id="contactMethod"
                className={selectStyle}
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
              {errors.contactMethod && (
                <p className={errorStyle}>
                  {errors.contactMethod.message?.toString()}
                </p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <input
                {...register("companyName")}
                id="companyName"
                className={`${inputStyle} bg-white`}
                type="text"
                placeholder="Company Name"
              />
              {errors.companyName && (
                <p className={errorStyle}>
                  {errors.companyName.message?.toString()}
                </p>
              )}
            </div>

            {/* Website */}
            <div>
              <input
                {...register("website")}
                id="website"
                className={`${inputStyle} bg-white`}
                type="text"
                placeholder="Website"
              />
              {errors.website && (
                <p className={errorStyle}>
                  {errors.website.message?.toString()}
                </p>
              )}
            </div>

            {/* Facebook Page */}
            <div>
              <input
                {...register("facebookPage")}
                id="facebookPage"
                className={`${inputStyle} bg-white`}
                type="text"
                placeholder="Facebook Page"
              />
              {errors.facebookPage && (
                <p className={errorStyle}>
                  {errors.facebookPage.message?.toString()}
                </p>
              )}
            </div>

            {/* What They Sell */}
            <div>
              <input
                {...register("whatTheySale")}
                id="whatTheySale"
                className={`${inputStyle} bg-white`}
                type="text"
                placeholder="What They Sell"
              />
              {errors.whatTheySale && (
                <p className={errorStyle}>
                  {errors.whatTheySale.message?.toString()}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <input
                {...register("location")}
                id="location"
                className={`${inputStyle} bg-white`}
                type="text"
                placeholder="Location"
              />
              {errors.location && (
                <p className={errorStyle}>
                  {errors.location.message?.toString()}
                </p>
              )}
            </div>

            {/* Language */}
            <div>
              <input
                {...register("language")}
                id="language"
                className={`${inputStyle} bg-white`}
                type="text"
                placeholder="Language"
              />
              {errors.language && (
                <p className={errorStyle}>
                  {errors.language.message?.toString()}
                </p>
              )}
            </div>

            {/* Query Category */}
            <div>
              <select
                {...register("queryCategory")}
                id="queryCategory"
                className={selectStyle}
              >
                <option value="general">General</option>
                <option value="technical">Technical Support</option>
                <option value="sales">Sales Inquiry</option>
              </select>
              {errors.queryCategory && (
                <p className={errorStyle}>
                  {errors.queryCategory.message?.toString()}
                </p>
              )}
            </div>

            {/* Budget Range */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input
                  {...register("budgetRange.min", { valueAsNumber: true })}
                  id="budgetRangeMin"
                  className={`${inputStyle} bg-white`}
                  type="number"
                  placeholder="Budget Min"
                />
                {errors.budgetRange?.min && (
                  <p className={errorStyle}>{errors.budgetRange.min.message}</p>
                )}
              </div>

              {/* Budget Max */}
              <div>
                <input
                  {...register("budgetRange.max", { valueAsNumber: true })}
                  id="budgetRangeMax"
                  className={`${inputStyle} bg-white`}
                  type="number"
                  placeholder="Budget Max"
                />
                {errors.budgetRange?.max && (
                  <p className={errorStyle}>{errors.budgetRange.max.message}</p>
                )}
              </div>

              {/* Currency */}
              <div>
                <select
                  {...register("budgetRange.currency")}
                  id="budgetRangeCurrency"
                  className={selectStyle}
                >
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                  <option value="BDT">BDT</option>
                </select>
                {errors.budgetRange?.currency && (
                  <p className={errorStyle}>
                    {errors.budgetRange.currency.message}
                  </p>
                )}
              </div>
            </div>

            {/* Client Messages */}
            <div className="md:col-span-2">
              <textarea
                {...register("clientMessages")}
                id="clientMessages"
                className={`${inputStyle} bg-white min-h-[120px]`}
                placeholder="Client Messages"
              />
              {errors.clientMessages && (
                <p className={errorStyle}>
                  {errors?.clientMessages?.message?.toString()}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 cursor-pointer bg-primary text-white rounded-md  transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Submitting...
                </>
              ) : (
                "Submit Query"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitQuery;
