import { z } from "zod";

export const projectSchema = z.object({
    title: z.string().min(1, "Blog title is required"),
    bio: z.string().min(10, "Bio must be at least 10 characters"),
    content: z.string().min(20, "Content must be at least 20 characters"),
    thumbnail: z.any().optional(), // Allow file uploads (not a URL)
});
