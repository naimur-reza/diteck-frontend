"use client";
import { useNotification } from "@/hooks/useNotification";
import { useCreateNewsLetterMutation } from "@/redux/api/adminApi/newsLetterApi/newsLetterApi";
import { TError } from "@/types";
import React, { useState } from "react";
import { LuArrowRight } from "react-icons/lu";

const FooterForm = () => {
  const [email, setEmail] = useState("");
  const [createNewsLetter, { isError, isSuccess, error, isLoading, data }] =
    useCreateNewsLetterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      await createNewsLetter({ email }).unwrap();
      setEmail(""); // Reset form after successful submission
    } catch (err) {
      console.error("Error submitting newsletter:", err);
    }
  };

  useNotification({
    isError,
    isSuccess,
    error: error as TError,
    isLoading,
    data,
  });

  return (
    <form onSubmit={handleSubmit}>
      <p className="footer-text">Get the latest inspiration & insights</p>
      <div className="my-5 relative lg:w-[70%]">
        <input
          type="email"
          placeholder="Your Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white p-4 placeholder:text-[#111] placeholder:font-bold rounded-2xl w-full text-[#111]"
          required
        />
        <div className="absolute  right-1 top-1">
          <button
            type="submit"
            className="bg-primary p-4 cursor-pointer rounded-xl"
            disabled={isLoading}
          >
            {<LuArrowRight />}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FooterForm;
