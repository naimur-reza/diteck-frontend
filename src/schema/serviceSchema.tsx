import { z } from "zod";

export const addServiceSchema = z.object({
  title: z.string().min(1, "Service title is required"),
  price: z.string().min(1, "Price must be at least 1"),
  features: z
    .array(z.string().min(1, "Feature cannot be empty"))
    .min(1, "At least one feature is required"),
  turnAroundTime: z.string().min(1, "Turnaround time is required"),
  frontendTech: z
    .array(z.string().min(1))
    .min(1, "At least one frontend technology is required"),
  cssFramework: z
    .array(z.string().min(1))
    .min(1, "At least one CSS framework is required"),
  componentLibrary: z
    .array(z.string().min(1))
    .min(1, "At least one component library is required"),
  animationLibrary: z
    .array(z.string().min(1))
    .min(1, "At least one animation library is required"),
  fileStorage: z
    .array(z.string().min(1))
    .min(1, "At least one file storage option is required"),
  backendTech: z
    .array(z.string().min(1))
    .min(1, "At least one backend technology is required"),
  database: z
    .array(z.string().min(1))
    .min(1, "At least one database is required"),
  paymentGateway: z
    .array(z.string().min(1))
    .min(1, "At least one payment gateway is required"),
  testing: z
    .array(z.string().min(1))
    .min(1, "At least one testing tool is required"),
  relevantWorkSamples: z
    .array(z.string().url("Must be a valid URL"))
    .min(1, "At least one work sample is required"),
  description: z.string().min(1, "Description is required"),
  coverImage: z.instanceof(File, { message: "Cover image is required" }),
});
