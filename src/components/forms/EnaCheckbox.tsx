import { Checkbox } from "@/components/ui/checkbox";
import { Control, Controller } from "react-hook-form";
import classNames from "classnames";

interface EnaCheckboxProps {
    name: string;
    label?: string;
    error?: string;
    className?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>
}

const EnaCheckbox: React.FC<EnaCheckboxProps> = ({ name, label, error, className }) => {
    return (
        <div className={classNames("flex flex-col", className)}>
            <Controller
                name={name}
                render={({ field }) => (
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={name}
                            checked={field.value} // Ensure it correctly binds the checked state
                            onCheckedChange={(checked) => field.onChange(checked)} // Use onCheckedChange instead of onChange
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
