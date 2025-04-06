import { TUser } from "./user.types";

export interface TProject {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  frontendTech: string[];
  backendTech: string[];
  databases: string[];
  timeTakenToDevelop: string;
  websiteFeatures: string[];
  securityFeatures: string[];
  category: string;
  slug: string;
  author: TUser;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
