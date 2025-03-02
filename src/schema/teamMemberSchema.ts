import { z } from "zod";

export const teamMemberSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  phoneNumber: z.string().nonempty(),
  emergencyContactNumber: z.string().nonempty(),
  address: z.string().nonempty(),
  role: z.string().nonempty(),
  designation: z.string().nonempty(),
  startDate: z.string().nonempty(),
  // profilePhoto: z.string().nonempty(),
});
