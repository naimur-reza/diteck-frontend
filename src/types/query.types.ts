import { TUser } from "./user.types";

export interface TQuery {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  contactMethod: string;
  budgetRange: BudgetRange;
  companyName: string;
  website: string;
  facebookPage: string;
  whatTheySale: string;
  location: string;
  language: string;
  queryCategory: string;
  clientMessages: string;
  status: string;
  priority: string;
  assignedTo: TUser;
  resolutionNotes: string;
  isDeleted: boolean;
  submissionDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetRange {
  min: number;
  max: number;
  currency: string;
  _id: string;
}
