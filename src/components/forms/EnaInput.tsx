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
  ...rest
}) => {
  const { control } = useFormContext();
  return (
    <div className={classNames("flex flex-col", className)}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <div className="grid gap-2">
            {label && <Label htmlFor={name}>{label}</Label>}
            <Input
              {...field}
              {...rest} // Accepts additional props
              className={classNames("rounded-md p-2 focus:outline-none", {
                "border-red-500 ": error,
              })}
            />

            {error && <p className="text-red-500 text-xs">{error.message}</p>}
          </div>
        )}
      />
    </div>
  );
};

export default EnaInput;
