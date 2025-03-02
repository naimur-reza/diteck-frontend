import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";

interface EnaSelectOption {
  value: string;
  label: string;
}

interface EnaSelectProps extends React.ComponentPropsWithoutRef<typeof Select> {
  name: string;
  options: EnaSelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
}

const EnaSelect: React.FC<EnaSelectProps> = ({
  name,
  options,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value,
  onChange,
  placeholder,
  error,
  disabled,
  className,
  label,
  ...restProps
}) => {
  const { control } = useFormContext();

  return (
    <div className={clsx("flex flex-col", className)}>
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({ field }) => (
          <div className="grid gap-2">
            {label && <Label htmlFor={name}>{label}</Label>}
            <Select
              {...field}
              {...restProps}
              disabled={disabled}
              onValueChange={(selectedValue) => {
                field.onChange(selectedValue);
                if (onChange) onChange(selectedValue);
              }}
            >
              <SelectTrigger
                className={clsx(
                  "w-full border rounded-md p-2",
                  error && "border-red-500"
                )}
              >
                <SelectValue placeholder={placeholder || "Select an option"} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      />

      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default EnaSelect;
