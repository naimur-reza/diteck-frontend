import { TUser } from "./user.types";

export interface TBlog {
  _id: string;
  title: string;
  bio: string;
  author: TUser;
  thumbnail: string;
  content: string;
  category: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
