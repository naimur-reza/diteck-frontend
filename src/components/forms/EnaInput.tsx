"use client";
import { Input } from "@/components/ui/input";
import classNames from "classnames";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";

interface EnaInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const EnaInput: React.FC<EnaInputProps> = ({
  name,
  className,
  label,
  type = "text",
  ...rest
}) => {
  const { control } = useFormContext();

  return (
    <div className={classNames("flex flex-col", className)}>
      <Controller
        control={control}
        name={name}
      
        defaultValue={type === "number" ? 0 : ""}
        render={({ field, fieldState: { error } }) => (
          <div className="grid gap-2">
            {label && <Label htmlFor={name}>{label}</Label>}
            <Input
              {...field}
              {...rest}
              type={type}
              value={
                type === "number"
                  ? field.value !== undefined
                    ? Number(field.value)
                    : ""
                  : field.value
              }
              onChange={(e) => {
                let value: number | string = e.target.value;
                if (type === "number") {
                  const parsedValue = Number(value);
                  value = isNaN(parsedValue) ? "" : parsedValue;
                }
                field.onChange(value);
              }}
              className={classNames(
                "border rounded-md p-2 focus:outline-none",
                {
                  "border-red-500": error,
                }
              )}
            />
            {error && (
              <span className="text-red-500 text-xs">{error.message}</span>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default EnaInput;
