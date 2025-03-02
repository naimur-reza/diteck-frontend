import { Input } from "@/components/ui/input";
import classNames from "classnames";
import { Controller, useForm } from "react-hook-form";
import { Label } from "../ui/label";

interface EnaInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: string;
  label?: string;
  register?: string;
}

const EnaInput: React.FC<EnaInputProps> = ({
  name,
  error,
  className,
  label,

  register,
  ...rest
}) => {
  const { register: formRegister } = useForm();

  return (
    <div className={classNames("flex flex-col", className)}>
      <Controller
        name={name}
        render={({ field }) => (
          <div className="grid gap-2">
            {label && <Label htmlFor={name}>{label}</Label>}
            <Input
              {...(register ? formRegister(register) : field)}
              {...rest} // Accepts additional props
              className={classNames(
                "border rounded-md p-2 focus:outline-none",
                { "border-red-500": error }
              )}
            />
          </div>
        )}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default EnaInput;
