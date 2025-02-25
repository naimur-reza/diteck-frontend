import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Controller } from "react-hook-form";

interface EnaSelectOption {
  value: string;
  label: string;
}

interface EnaSelectProps {
  name: string;
  options: EnaSelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const EnaSelect: React.FC<EnaSelectProps> = ({
  name = "",
  options,
  value,
  onChange,
  placeholder,
  error,
  disabled,
  className,
}) => {
  return (
    <div className={clsx("flex flex-col", className)}>
      <Controller
        defaultValue=""
        name={name}
        render={({ field }) => (
          <Listbox
            as={"div"}
            {...field}
            onChange={(value) => {
              field.onChange(value);
              if (onChange) onChange(value);
            }}
            disabled={disabled}
          >
            {({ open }) => (
              <>
                <ListboxButton
                  as="button"
                  className={clsx(
                    "w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow",
                    error && "border-red-500",
                    disabled && "bg-gray-100"
                  )}
                >
                  {value ? (
                    options.find((option) => option.value === value)?.label
                  ) : (
                    <span className="text-slate-400">{placeholder}</span>
                  )}
                  <ChevronUpDownIcon
                    className={clsx(
                      "ml-2 h-5 w-5 text-slate-400",
                      open && "rotate-180"
                    )}
                  />
                </ListboxButton>

                {open && (
                  <ListboxOptions className="absolute z-10 mt-1 w-full bg-white shadow-lg py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {options.map((option) => (
                      <ListboxOption
                        key={option.value}
                        value={option.value}
                        className={({ active }) =>
                          clsx(
                            "relative cursor-default select-none py-2 pl-10 pr-4",
                            active
                              ? "bg-slate-100 text-slate-900"
                              : "text-slate-700"
                          )
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={clsx(
                                "block truncate",
                                selected && "font-medium"
                              )}
                            >
                              {option.label}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                )}
              </>
            )}
          </Listbox>
        )}
      />

      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default EnaSelect;
