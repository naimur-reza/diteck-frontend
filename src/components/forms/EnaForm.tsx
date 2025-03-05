/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

type TFormConfig = {
  schema?: z.ZodSchema<any>;
  defaultValues?: Record<string, any>;
  resolver?: any;
  buttonPosition?: "left" | "right";
  isLoading?: boolean;
  buttonText?: string;
};

type TFormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;

const EnaForm = ({
  children,
  onSubmit,
  schema,
  defaultValues,
  buttonPosition,
  isLoading,
  buttonText,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (schema) {
    formConfig["resolver"] = zodResolver(schema);
  }

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  const methods = useForm({ ...formConfig, mode: "onSubmit" });
  const { handleSubmit } = methods;

  const submit: SubmitHandler<FieldValues> = async (data) => {
    await onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form className="w-full" onSubmit={handleSubmit(submit)}>
        {children}

        {buttonText && (
          <Button
            type="submit"
            size="sm"
            className={cn(
              {
                "float-right": buttonPosition === "right",
                "float-left": buttonPosition === "left",
              },
              "mt-2"
            )}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : buttonText}
          </Button>
        )}
      </form>
    </FormProvider>
  );
};

export default EnaForm;
