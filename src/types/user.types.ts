export interface TUser {
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: "superAdmin" | "admin" | "manager";
  permissions?: string[];
  status: "active" | "inactive" | "blocked";
  lastLogin?: Date;
  failedLoginAttempts?: number;
  accountLockedUntil?: Date;
  twoFactorEnabled?: boolean;
  rememberMe?: boolean;
  loginAttempts?: number;
  lastFailedLogin?: Date;
  isVerified: boolean;
  isDeleted: boolean;
}
