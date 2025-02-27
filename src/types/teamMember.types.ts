import { TUser } from "./user.types";

export interface TTeamMember {
  socialProfiles: SocialProfiles;
  _id: string;
  name: string;
  designation: string;
  user: TUser;
  email: string;
  phoneNumber: string;
  address: string;
  emergencyContactNumber: string;
  education: string;
  profilePhoto: string;
  startDate: string;
  teamRole: string;
  bio: string;
  status: string;
  skills: string[];
  endDate: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SocialProfiles {
  linkedIn: string;
  facebook: string;
  twitter: string;
}
