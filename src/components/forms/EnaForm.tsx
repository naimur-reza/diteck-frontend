/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";

type TFormConfig = {
  schema?: z.ZodSchema<any>;
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;

const EnaForm = ({ children, onSubmit, schema, defaultValues }: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (schema) {
    formConfig["resolver"] = zodResolver(schema);
  }

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  const methods = useForm({ ...formConfig, mode: "all" });
  const { handleSubmit, reset } = methods;

  const submit: SubmitHandler<FieldValues> = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default EnaForm;
