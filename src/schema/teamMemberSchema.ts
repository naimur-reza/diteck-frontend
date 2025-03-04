import { z } from "zod";

export const teamMemberSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number cannot exceed 15 digits" })
    .nonempty({ message: "Phone number is required" }),
  emergencyContactNumber: z
    .string()
    .min(10, { message: "Emergency contact must be at least 10 digits" })
    .max(15, { message: "Emergency contact cannot exceed 15 digits" })
    .nonempty({ message: "Emergency contact number is required" }),
  address: z.string().nonempty({ message: "Address is required" }),
  teamRole: z.string().nonempty({ message: "Team role is required" }),
  designation: z.string().nonempty({ message: "Designation is required" }),
  startDate: z.string({ message: "Start date is required" }),
  profilePhoto: z.instanceof(File, { message: "Cover image is required" }),
});

export const updateTeamMemberSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number cannot exceed 15 digits" })
    .optional(),
  emergencyContactNumber: z
    .string()
    .min(10, { message: "Emergency contact must be at least 10 digits" })
    .max(15, { message: "Emergency contact cannot exceed 15 digits" })
    .optional(),
  address: z.string().optional(),
  teamRole: z.string().optional(),
  designation: z.string().optional(),
  startDate: z.string().optional(),
  profilePhoto: z
    .instanceof(File, { message: "Cover image is required" })
    .optional(),
});
