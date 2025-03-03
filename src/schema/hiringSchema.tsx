import { z } from "zod";

export const hiringSchema = z.object({
    companyName: z.string().min(1, "Company Name is required"),
    title: z.string().min(1, "Job Title is required"),
    jobNature: z.string().min(1, "Job Nature is required"),
    workingHours: z.string().min(1, "Working Hours are required"),
    workingDays: z.string().min(1, "Working Days are required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    salaryRange: z.string().min(1, "Salary range is required"),
    location: z.string().min(1, "Location is required"),
    experience: z.string().min(1, "Experience is required"),
    applicationDeadline: z.string().min(1, "Deadline is required"),
    jobType: z.string().min(1, "Job Type is required"),
    status: z.string().min(1, "Status is required"),
    department: z.string().min(1, "Department is required"),
    requirements: z.array(z.string()).min(1, "At least one requirement is required"),
    skillsRequired: z.array(z.string()).min(1, "At least one skill is required"),
    benefits: z.array(z.string()).min(1, "At least one benefit is required"),
    responsibilities: z.array(z.string()).min(1, "At least one responsibility is required"),
    interviewRounds: z.array(z.string()).min(1, "At least one interview round is required"),
    file: z.any().optional(), // Allow file uploads (not a URL)
});