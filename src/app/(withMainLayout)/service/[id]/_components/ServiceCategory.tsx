"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { menuItems } from "../constant";
import { useGetAllServiceQuery } from "@/redux/api/adminApi/serviceApi/serviceApi";
import Link from "next/link";

export const ServiceCategory = () => {
  const [selected, setSelected] = useState<string | null>("Marketing Strategy");
  const { data } = useGetAllServiceQuery([])
  const services = data?.data || [];

  return (
    <div className="bg-white px-8 py-4 rounded-3xl shadow w-full">
      {services?.map((service, index) => (
        <Link
          href={`/service/${service?.slug}`}
          key={index}
          onClick={() => setSelected(service?.title)}
          className={`flex items-center justify-between w-full px-8 py-4 cursor-pointer   text-left text-lg font-medium   ${selected === service?.title
            ? "bg-primary text-white rounded-2xl"
            : `bg-transparent text-black `
            }
          
          ${selected === menuItems[index + 1] ? "" : "border-b border-gray-200"}
          ${index == menuItems.length - 1 ? "border-none" : ""}
          `}
        >
          {service?.title}
          <ArrowRight
            size={20}
            strokeWidth={3}
            className={selected === service?.title ? "text-white" : "text-primary"}
          />
        </Link>
      ))}
    </div>
  );
};
