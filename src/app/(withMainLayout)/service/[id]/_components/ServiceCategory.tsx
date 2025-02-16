"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { menuItems } from "../constant";

export const ServiceCategory = () => {
  const [selected, setSelected] = useState<string | null>("Marketing Strategy");

  return (
    <div className="bg-white px-8 py-4 rounded-3xl shadow w-full">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => setSelected(item)}
          className={`flex items-center justify-between w-full px-8 py-4 cursor-pointer   text-left text-lg font-medium   ${
            selected === item
              ? "bg-primary text-white rounded-2xl"
              : `bg-transparent text-black `
          }
          
          ${selected === menuItems[index + 1] ? "" : "border-b border-gray-200"}
          ${index == menuItems.length - 1 ? "border-none" : ""}
          `}
        >
          {item}
          <ArrowRight
            size={20}
            strokeWidth={3}
            className={selected === item ? "text-white" : "text-primary"}
          />
        </button>
      ))}
    </div>
  );
};
