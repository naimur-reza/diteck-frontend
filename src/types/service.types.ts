import { TUser } from "./user.types";

export interface TService {
  _id: string;
  title: string;
  price: Price;
  features: string[];
  description: string;
  photo: string;
  turnAroundTime: string;
  frontendTech: string[];
  cssFramework: string[];
  componentLibrary: string[];
  animationLibrary: string[];
  fileStorage: string[];
  backendTech: string[];
  database: string[];
  paymentGateway: string[];
  testing: string[];
  relevantWorkSamples: string[];
  status: string;
  serviceCategory: string;
  createdBy: TUser;
  slug: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Price {
  basePrice: number;
  currency: string;
  customPricingAvailable: boolean;
  _id: string;
}
