"use client";
import classNames from "classnames";
import { Controller } from "react-hook-form";
import { Textarea } from "../ui/textarea";

interface EnaInputProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

const EnaTextArea: React.FC<EnaInputProps> = ({ name, className, ...rest }) => {
  return (
    <div className={classNames("flex flex-col", className)}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <Textarea
              {...field}
              {...rest}
              className={classNames(
                "border rounded-md p-2 focus:outline-none",
                {
                  "border-red-500": error,
                }
              )}
            />
            {error && (
              <span className="text-red-500 text-sm mt-1">{error.message}</span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default EnaTextArea;
