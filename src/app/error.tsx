/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

const ErrorPage = ({ error, reset }: { error: any; reset: any }) => {
  return (
    <div>
      <h1 className="text-2xl text-center text-red-500">
        something went wrong
      </h1>
      <h1 className="text-2xl text-center text-red-500">{error.message}</h1>
      <button
        onClick={() => reset()}
        className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorPage;
