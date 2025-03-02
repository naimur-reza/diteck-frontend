import { TError } from "@/types";
import ErrorHandling from "@/utils/ErrorHandeling";
import React from "react";

const ErrorMessage = ({ error }: { error: TError }) => {
  const errors = ErrorHandling(error as TError);

  return (
    <div className="mt-5">
      {Array.isArray(errors) &&
        errors.length > 0 &&
        errors.map((item, index) => (
          <div
            key={index}
            className="bg-red-100 my-2 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{item}</span>
          </div>
        ))}
    </div>
  );
};

export default ErrorMessage;
