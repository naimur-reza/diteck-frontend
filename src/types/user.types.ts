export interface TUser {
  _id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  role: string;
  permissions: string[];
  status: string;
  failedLoginAttempts: number;
  twoFactorEnabled: boolean;
  rememberMe: boolean;
  loginAttempts: number;
  lastFailedLogin: number;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastLogin: string;
}
