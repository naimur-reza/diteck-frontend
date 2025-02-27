import { Input } from "@/components/ui/input";
import classNames from "classnames";
import { Controller } from "react-hook-form";

interface EnaInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: string;
}

const EnaTextArea: React.FC<EnaInputProps> = ({ name, error, className, ...rest }) => {
  return (
    <div className={classNames("flex flex-col", className)}>
      <Controller
        name={name}
        render={({ field }) => (
          <Input
            {...field}
            {...rest} // Accepts additional props
            className={classNames(
              "border rounded-md p-2 focus:outline-none",
              { "border-red-500": error }
            )}
          />
        )}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default EnaTextArea;
