"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

const menuItems = [
  "Advanced Analytics",
  "Marketing Strategy",
  "System and Software",
  "Digital Strategy",
  "Web Development",
  "Brand Identity",
  "UX/UI Design",
];

const ServiceCategory = () => {
  const [selected, setSelected] = useState<string | null>(null);

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

export default ServiceCategory;
