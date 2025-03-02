import { Upload, X, FileIcon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "../ui/form";

type GUploadProps = {
  name: string;
  label: string;
  accept: string;
  required?: boolean;
};

const EnaFileUpload: React.FC<GUploadProps> = ({ name, label, accept }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div>
              <div
                className={`border-2 border-dashed rounded-lg p-4 text-center ${
                  value ? "border-primary bg-primary/10" : "border-gray-300"
                } transition-colors duration-200 ease-in-out`}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && accept.includes(file.type)) {
                    onChange(file);
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                {value ? (
                  <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
                    <div className="flex items-center space-x-2">
                      <FileIcon className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium text-gray-700">
                        {value.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onChange(null)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto w-12 h-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Drag and drop your file here, or{" "}
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
              <input
                id={`file-${name}`}
                type="file"
                accept={accept}
                onChange={(e) => {
                  onChange(e.target.files ? e.target.files[0] : null);
                }}
                className="hidden"
              />
            </div>
          </FormControl>
          {error && (
            <p className="text-red-500 text-sm mt-1">{error.message}</p>
          )}
        </FormItem>
      )}
    />
  );
};

export default EnaFileUpload;
