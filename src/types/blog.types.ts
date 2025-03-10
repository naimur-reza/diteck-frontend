import { TUser } from "./user.types";

export interface TComment {
  _id: string;
  commenterName: string;
  text: string;
  email: string;
  website: string;
  saveInfo: boolean;
  blogId: string;
  replies: TComment[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TBlog {
  _id: string;
  title: string;
  bio: string;
  author: TUser;
  thumbnail: string;
  content: string;
  category: string;
  comments: TComment[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
