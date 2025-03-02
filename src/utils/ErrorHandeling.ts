import { TError } from "@/types";
import { useEffect, useState } from "react";

const ErrorHandling = (errors: TError) => {
  const [error, setError] = useState<string[]>([]);

  useEffect(() => {
    if (errors?.data?.errorSources) {
      const errorMessages = errors.data.errorSources.map(
        (err) => `${err.path}-${err.message}`
      );
      setError(errorMessages);
    } else {
      setError([]);
    }
  }, [errors]);

  return error || [];
};

export default ErrorHandling;
