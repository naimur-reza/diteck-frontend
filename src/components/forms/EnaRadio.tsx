import { Controller, Control } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import classNames from "classnames";

interface EnaRadioOption {
    value: string;
    label: string;
}

interface EnaRadioGroupProps {
    name: string;
    options: EnaRadioOption[];
    value?: string;
    onChange?: (value: string) => void;
    error?: string;
    disabled?: boolean;
    className?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
}

const EnaRadioGroup: React.FC<EnaRadioGroupProps> = ({
    name,
    options,
    value,
    onChange,
    error,
    disabled,
    className,
    control,
}) => {
    return (
        <div className={classNames("flex flex-col", className)}>
            <Controller
                name={name}
                control={control}
                defaultValue={value || ""}
                render={({ field }) => (
                    <RadioGroup
                        value={field.value}
                        onValueChange={(selectedValue) => {
                            field.onChange(selectedValue);
                            if (onChange) onChange(selectedValue);
                        }}
                        className="flex flex-col gap-2"
                    >
                        {options.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value={option.value}
                                    id={option.value}
                                    disabled={disabled}
                                />
                                <Label htmlFor={option.value}>{option.label}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                )}
            />
            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>
    );
};

export default EnaRadioGroup;
