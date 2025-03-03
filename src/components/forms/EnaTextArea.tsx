"use client";
import classNames from "classnames";
import { Controller } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

interface EnaInputProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
}

const EnaTextArea: React.FC<EnaInputProps> = ({ name, label, className, ...rest }) => {
  return (
    <div className={classNames("flex flex-col", className)}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <div className="grid gap-2">
            {label && <Label htmlFor={name}>{label}</Label>}
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
          </div>
        )}
      />
    </div>
  );
};

export default EnaTextArea;
