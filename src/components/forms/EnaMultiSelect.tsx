/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Controller } from "react-hook-form";
import clsx from "clsx";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface MultiSelectOption {
    label: string;
    value: string;
}

interface EnaMultiSelectProps {
    name: string;
    control: any; // Passed from react-hook-form
    options: MultiSelectOption[];
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    className?: string;
}

const EnaMultiSelect: React.FC<EnaMultiSelectProps> = ({
    name,
    control,
    options,
    placeholder = "Select options...",
    error,
    disabled,
    className,
}) => {
    return (
        <div className={clsx("flex flex-col", className)}>
            <Controller
                name={name}
                control={control}
                defaultValue={[]} // Ensure it's an array for multi-select
                render={({ field }) => {
                    const selectedValues = field.value || [];

                    const handleSelect = (value: string) => {
                        const newValues = selectedValues.includes(value)
                            ? selectedValues.filter((v: string) => v !== value) // Remove if already selected
                            : [...selectedValues, value]; // Add if not selected

                        field.onChange(newValues);
                    };

                    return (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={false}
                                    disabled={disabled}
                                    className={clsx("w-full justify-between", error && "border-red-500")}
                                >
                                    {selectedValues.length > 0
                                        ? options
                                            .filter((option) => selectedValues.includes(option.value))
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
                                                onSelect={() => handleSelect(option.value)}
                                                className="flex items-center justify-between"
                                            >
                                                {option.label}
                                                {selectedValues.includes(option.value) && <Check className="h-4 w-4" />}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    );
                }}
            />

            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>
    );
};

export default EnaMultiSelect;
