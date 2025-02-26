import { TUser } from "./user.types";

export interface THiring {
  _id: string;
  createdBy: TUser;
  companyName: string;
  title: string;
  hiringImage: string;
  jobNature: string;
  workingHours: string;
  workingDays: string;
  description: string;
  salaryRange: string;
  location: string;
  requirements: string[];
  experience: string;
  benefits: string[];
  responsibilities: string[];
  interviewRounds: string[];
  applicationDeadline: string;
  jobType: string;
  status: string;
  department: string;
  skillsRequired: string[];
  views: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
