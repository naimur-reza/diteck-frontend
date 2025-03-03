"use client";

import { FileIcon, Upload, X, Link } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "../ui/form";

type GUploadProps = {
  name: string;
  label: string;
  accept: string;
  required?: boolean;
};

const EnaFileUploadMultiple: React.FC<GUploadProps> = ({ name, label, accept }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value = [], onChange }, fieldState: { error } }) => {
        const filesArray = Array.isArray(value) ? value : [];

        const handleFileChange = (files: FileList | null) => {
          if (!files) return;
          const newFiles = Array.from(files);
          onChange([...filesArray, ...newFiles]); // Append new files
        };

        const handleRemove = (index: number) => {
          onChange(filesArray.filter((_, i) => i !== index));
        };

        return (
          <FormItem className="w-full">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div>
                {/* Drop Zone */}
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center ${filesArray.length ? "border-primary bg-primary/10" : "border-gray-300"
                    } transition-colors duration-200 ease-in-out`}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleFileChange(e.dataTransfer.files);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {filesArray.length > 0 ? (
                    <div className="space-y-2">
                      {filesArray.map((item: File | string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-100 p-2 rounded"
                        >
                          <div className="flex items-center space-x-2">
                            {typeof item === "string" ? (
                              <Link className="w-5 h-5 text-blue-500" />
                            ) : (
                              <FileIcon className="w-5 h-5 text-primary" />
                            )}
                            <span className="text-sm font-medium text-gray-700 truncate w-48">
                              {typeof item === "string" ? (
                                <a
                                  href={item}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 underline"
                                >
                                  {item}
                                </a>
                              ) : (
                                item.name
                              )}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="text-red-500 hover:text-red-700 transition-colors duration-200"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <Upload className="mx-auto size-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Drag and drop your files here, or{" "}
                        <label
                          htmlFor={`file-${name}`}
                          className="text-primary hover:text-primary-dark font-medium cursor-pointer"
                        >
                          browse
                        </label>
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {accept.split(",").join(", ")} files are allowed
                      </p>
                    </div>
                  )}
                </div>

                {/* Hidden File Input */}
                <input
                  id={`file-${name}`}
                  type="file"
                  accept={accept}
                  multiple
                  onChange={(e) => {
                    handleFileChange(e.target.files);
                    e.target.value = ""; // Reset input to allow re-upload of same files
                  }}
                  className="hidden"
                />

                {/* URL Input Field */}
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Paste image URL..."
                    className="w-full border rounded p-2 text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const url = (e.target as HTMLInputElement).value.trim();
                        if (url) {
                          onChange([...filesArray, url]);
                          (e.target as HTMLInputElement).value = "";
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </FormControl>

            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
          </FormItem>
        );
      }}
    />
  );
};

export default EnaFileUploadMultiple;
