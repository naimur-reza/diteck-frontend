import { z } from "zod";

export const projectSchema = z.object({
    title: z.string().min(1, "Project title is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    frontendTech: z.array(z.string()).min(1, "At least one frontend technology is required"),
    backendTech: z.array(z.string()).min(1, "At least one backend technology is required"),
    databases: z.array(z.string()).min(1, "At least one database technology is required"),
    deployment: z.array(z.string()).min(1, "At least one deployment method is required"),
    testing: z.array(z.string()).min(1, "At least one testing tool is required"),
    requirement: z.string().min(10, "Requirements should be at least 10 characters"),
    timeTakenToDevelop: z.string().min(1, "Time taken to develop is required"),
    websiteFeatures: z.array(z.string()).min(1, "At least one website feature is required"),
    securityFeatures: z.array(z.string()).min(1, "At least one security feature is required"),
    category: z.string().min(1, "Category is required"),
    author: z.string(), // Author can be an ID or username
    thumbnail: z.any().optional(), // Allow file uploads (not a URL)
});
