"use client";

import type React from "react";

import { EnaForm, EnaInput } from "@/components/forms";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotification } from "@/hooks/useNotification";
import { removeClientAuthCookie } from "@/lib/auth";
import {
  useChangePasswordMutation,
  useGetLoggedInUserQuery,
} from "@/redux/api/authApi/authApi";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TError } from "@/types";
import { Calendar, Lock, Mail, Shield, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
const passwordChangeSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const UserAccount = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data, isLoading } = useGetLoggedInUserQuery(undefined);
  const [
    changePassword,
    { isError, isLoading: cIsLoading, isSuccess, error, data: cData },
  ] = useChangePasswordMutation();

  const handleLogout = useCallback(() => {
    // Clear user from Redux
    dispatch(logout());

    // Remove the auth cookie
    removeClientAuthCookie();

    // Redirect to login page
    router.push("/login");
  }, [dispatch, router]);

  const handleSubmitPasswordChange = (data: FieldValues) => {
    changePassword({
      newPassword: data?.newPassword,
      oldPassword: data?.oldPassword,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      handleLogout();
    }
  }, [isSuccess, handleLogout]);

  useNotification({
    isError,
    isLoading: cIsLoading,
    isSuccess,
    data: cData,
    error: error as TError,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-lg">
          Loading account information...
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">No account information available</div>
      </div>
    );
  }

  const user = data?.data;

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{user?.user?.name}</CardTitle>
            <CardDescription className="flex items-center justify-center gap-1">
              <Mail className="h-4 w-4" />
              {user?.user?.email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Shield className="h-4 w-4" /> Role
                </span>
                <Badge variant="outline" className="capitalize">
                  {user?.user?.role}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <User className="h-4 w-4" /> Status
                </span>
                <Badge
                  variant={
                    user?.user?.status === "active"
                      ? "default"
                      : user?.user?.status === "blocked"
                      ? "destructive"
                      : "secondary"
                  }
                  className="capitalize"
                >
                  {user?.user?.status}
                </Badge>
              </div>
              {user?.user.lastLogin && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Last Login
                  </span>
                  <span className="text-sm">
                    {new Date(user?.user.lastLogin).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <div className="md:col-span-2">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile Details</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    View and manage your account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={user?.user?.name} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={user?.user?.email} readOnly />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Account Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">
                          Verification Status
                        </Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={
                              user?.user.isVerified ? "outline" : "destructive"
                            }
                          >
                            {user?.user.isVerified
                              ? "Verified"
                              : "Not Verified"}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">
                          Two-Factor Authentication
                        </Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={
                              user?.user?.twoFactorEnabled
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {user?.user?.twoFactorEnabled
                              ? "Enabled"
                              : "Disabled"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EnaForm
                    onSubmit={handleSubmitPasswordChange}
                    schema={passwordChangeSchema}
                    defaultValues={{
                      oldPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    }}
                  >
                    <EnaInput
                      name="oldPassword"
                      type={"password"}
                      placeholder="Enter your current password"
                      className="mb-4"
                    />
                    <EnaInput
                      name="newPassword"
                      type={"password"}
                      placeholder="Enter your new password"
                      className="mb-4"
                    />
                    <EnaInput
                      name="confirmPassword"
                      type={"password"}
                      placeholder="Confirm your new password"
                      className="mb-4"
                    />

                    <div className="flex items-center gap-2 mb-4">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Password must be at least 8 characters and include a mix
                        of letters, numbers, and symbols.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-hover cursor-pointer"
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Update Password"}
                    </button>
                  </EnaForm>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
