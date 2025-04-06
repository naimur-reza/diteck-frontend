import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  timeTakenToDevelop: z.string().min(1, "Time taken to develop is required"),
  category: z.string().min(1, "Category is required"),

  liveLink: z.string().url("Invalid URL").optional(),
  fileStorage: z.string().optional(),
  cssFrameworks: z.string().optional(),
  componentLibrary: z.string().optional(),
  animationLibrary: z.string().optional(),

  frontendTech: z
    .array(z.string())
    .min(1, "At least one frontend technology is required"),
  backendTech: z
    .array(z.string())
    .min(1, "At least one backend technology is required"),
  databases: z
    .array(z.string())
    .min(1, "At least one database technology is required"),
  websiteFeatures: z
    .array(z.string())
    .min(1, "At least one website feature is required"),
  securityFeatures: z
    .array(z.string())
    .min(1, "At least one security feature is required"),

  //   createdBy: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid author ID"),

  thumbnail: z
    .union([
      z.instanceof(File), // File upload (client-side validation)
      z.string().url("Invalid image URL"), // URL (if using an image link)
    ])
    .optional(),

  // images: z.array(
  //   z.union([
  //     z.instanceof(File), // Accepts File upload
  //     z.string().url("Invalid image URL"), // Accepts image URLs
  //   ])
  // ).optional(),
});
