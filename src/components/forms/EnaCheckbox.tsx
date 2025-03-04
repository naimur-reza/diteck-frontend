import { Checkbox } from "@/components/ui/checkbox";
import { Controller, useFormContext } from "react-hook-form";
import classNames from "classnames";

interface EnaCheckboxProps {
  name: string;
  label?: string;
  error?: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

const EnaCheckbox: React.FC<EnaCheckboxProps> = ({
  name,
  label,
  error,
  className,
}) => {
  const { control } = useFormContext();
  return (
    <div className={classNames("flex flex-col", className)}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked)}
            />
            {label && (
              <label
                htmlFor={name}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
            )}
          </div>
        )}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default EnaCheckbox;
