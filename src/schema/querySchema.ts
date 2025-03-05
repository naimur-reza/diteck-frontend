import { z } from "zod";

export const querySchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone Number must be at least 10 digits"),
  contactMethod: z.enum(["email", "phone"], {
    required_error: "Contact Method is required",
  }),
  companyName: z.string().optional(),
  website: z.string().url("Invalid URL").optional(),
  facebookPage: z.string().url("Invalid URL").optional(),
  location: z.string().min(1, "Location is required"),
  language: z.string().min(1, "Language is required"),
  queryCategory: z.enum(["general", "service-related"], {
    required_error: "Query Category is required",
  }),
  whatTheySale: z.enum(["product", "services", "other"], {
    required_error: "This field is required",
  }),
  budgetRange: z.object({
    min: z.number().min(1, "Minimum budget must be greater than 0"),
    max: z.number().min(1, "Maximum budget must be greater than 0"),
    currency: z.enum(["EUR", "USD", "GBP", "BDT"], {
      required_error: "Currency is required",
    }),
  }),
  clientMessages: z.string().min(1, "Client message is required"),
});
