import { Input } from "@headlessui/react";
import classNames from "classnames";
import { Controller } from "react-hook-form";

interface EnaInputProps {
  type: "text" | "email" | "password";
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const EnaInput: React.FC<EnaInputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  className,
}) => {
  return (
    <div className={classNames("flex flex-col", className)}>
      <Controller
        defaultValue=""
        name={name}
        render={({ field }) => (
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            onChange={(e) => {
              field.onChange(e);
              if (onChange) onChange(e);
            }}
            value={value}
            disabled={disabled}
            className={classNames("border rounded-md p-2", {
              "border-red-500": error,
            })}
          />
        )}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default EnaInput;
