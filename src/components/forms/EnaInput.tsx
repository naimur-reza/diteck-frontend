import { Input } from "@/components/ui/input";
import classNames from "classnames";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";

interface EnaInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;

  label?: string;
  register?: string;
}

const EnaInput: React.FC<EnaInputProps> = ({
  name,

  className,
  label,
  ...rest
}) => {
  const { control } = useFormContext();

  return (
    <div className={classNames("flex flex-col", className)}>
      <Controller
        name={name}
        control={control} // Fix: Pass control to Controller
        defaultValue={rest.defaultValue ?? ""} // Ensure defaultValue is set
        render={({ field, fieldState: { error } }) => (
          <div className="grid gap-2">
            {label && <Label htmlFor={name}>{label}</Label>}
            <Input
              {...field}
              {...rest}
              className={classNames(
                "border rounded-md p-2 focus:outline-none",
                { "border-red-500": error }
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

export default EnaInput;
