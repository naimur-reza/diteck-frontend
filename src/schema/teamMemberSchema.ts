import { format } from "date-fns";
import { z } from "zod";

export const teamMemberSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().nonempty({ message: "Phone number is required" }),
  emergencyContactNumber: z
    .string()
    .nonempty({ message: "Emergency contact number is required" }),
  address: z.string().nonempty({ message: "Address is required" }),
  teamRole: z.string().nonempty({ message: "Team role is required" }),
  designation: z.string().nonempty({ message: "Designation is required" }),
  startDate: z
    .date({ message: "Start date is required" })
    .transform((date) => format(date, "dd-MM-yyyy")),
  profilePhoto: z.instanceof(File, { message: "Cover image is required" }),
});
