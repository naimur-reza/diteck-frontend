import { TUser } from "./user.types";

export interface TAdminAndManager {
  _id: string;
  user: TUser;
  email: string;
  name: string;
  profilePhoto: string;
  phoneNumber: string;
  city: string;
  address: string;
  gender: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
