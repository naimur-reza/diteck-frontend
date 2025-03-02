"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import React, { KeyboardEvent, useRef } from "react";
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
} from "react-hook-form";

interface EnaMultiInputProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  helperText?: string;
}

export function EnaMultiInput<T extends FieldValues>({
  name,
  label,
  placeholder = "Type something and press Enter...",
  helperText,
}: EnaMultiInputProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[] as PathValue<T, Path<T>>}
      render={({ field, fieldState: { error } }) => {
        const items: string[] = field.value || [];

        const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter") {
            event.preventDefault();
            const value = inputRef.current?.value.trim();

            if (value && !items.includes(value!)) {
              const updatedItems = [...items, value];
              field.onChange(updatedItems);
              if (inputRef.current) {
                inputRef.current.value = "";
              }
            }
          }
        };

        const removeItem = (itemToRemove: string) => {
          const updatedItems = items.filter(
            (item: string) => item !== itemToRemove
          );
          field.onChange(updatedItems);
        };

        return (
          <div className="grid gap-2">
            {label && <Label htmlFor={name}>{label}</Label>}
            <Input
              ref={inputRef}
              id={name}
              placeholder={placeholder}
              onKeyDown={handleKeyDown}
              className="w-full p-2"
            />
            {helperText && (
              <p className="text-sm text-muted-foreground">{helperText}</p>
            )}

            <div className="flex flex-wrap gap-2 mt-2">
              {items.map((item: string) => (
                <Badge key={item} variant="secondary" className="px-3 py-1.5">
                  {item}
                  <button
                    type="button"
                    className="ml-2 text-muted-foreground hover:text-foreground"
                    onClick={() => removeItem(item)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {error && (
              <span className="text-red-500 text-sm mt-1">{error.message}</span>
            )}
          </div>
        );
      }}
    />
  );
}
