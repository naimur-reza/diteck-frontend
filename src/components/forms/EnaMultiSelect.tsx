import * as React from "react";
import { Controller } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface MultiSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  onChange?: (value: string[]) => void;
}

const EnaMultiSelect: React.FC<MultiSelectProps> = ({ control, name, options, placeholder = "Select options...", onChange }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {field.value && field.value.length > 0
                  ? options
                      .filter((option) => field.value.includes(option.value))
                      .map((option) => option.label)
                      .join(", ")
                  : placeholder}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-2">
              <Command>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => {
                        let newValue;
                        if (field.value.includes(option.value)) {
                          newValue = field.value.filter((v: string) => v !== option.value);
                        } else {
                          newValue = [...(field.value || []), option.value];
                        }

                        field.onChange(newValue);
                        if (onChange) onChange(newValue); // External onChange
                      }}
                      className="flex items-center justify-between"
                    >
                      {option.label}
                      {field.value?.includes(option.value) && <Check className="h-4 w-4" />}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
};

export default EnaMultiSelect;
