import { z } from "zod";

export const userSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  adminData: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    gender: z.enum(["male", "female", "other"], {
      message: "Select a valid gender",
    }),
    role: z.enum(["superAdmin", "admin", "manager"], { message: "Select a valid role" }),
    city: z.string().min(1, "City is required"),
    address: z.string().min(1, "Address is required"),
  }),
  profilePhoto: z.instanceof(File, { message: "Cover image is required" }),
});
export const updateUserSchema = z.object({
  // password: z.string().min(6, "Password must be at least 6 characters"),
  adminData: z.object({
    name: z.string().min(1, "Name is required"),
    // email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    gender: z.enum(["male", "female", "other"], {
      message: "Select a valid gender",
    }),
    role: z.enum(["superAdmin", "admin", "manager"], { message: "Select a valid role" }),
    city: z.string().min(1, "City is required"),
    address: z.string().min(1, "Address is required"),
  }),
  profilePhoto: z
    .instanceof(File, { message: "Cover image is required" })
    .optional(),
});
