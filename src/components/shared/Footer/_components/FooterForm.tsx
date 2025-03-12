"use client";
import { useCreateNewsLetterMutation } from "@/redux/api/adminApi/newsLetterApi/newsLetterApi";
import React from "react";
import { LuArrowRight } from "react-icons/lu";

const FooterForm = () => {
  const [createNewsLetter, { isError, isSuccess, error, isLoading, data }] =
    useCreateNewsLetterMutation();
  return (
    <form>
      <p className="footer-text">Get the latest inspiration & insights</p>
      <div className="my-5 relative lg:w-[70%]">
        <input
          type="text"
          placeholder="Your Email..."
          className="bg-white p-4 placeholder:text-[#111] placeholder:font-bold rounded-2xl w-full text-[#111]"
        />
        <div className="absolute right-1 top-1">
          <button className="bg-primary p-4 rounded-xl">
            <LuArrowRight />
          </button>
        </div>
      </div>
    </form>
  );
};

export default FooterForm;
