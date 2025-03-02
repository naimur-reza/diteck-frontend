"use server";

import { tokenName } from "@/constants";
import { cookies } from "next/headers";

// Set auth token in HTTP-only cookie
export const setAuthCookie = async (token: string) => {
  (await cookies()).set({
    name: tokenName,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    sameSite: "strict",
  });
};

// Remove auth token cookie
export const removeAuthCookie = async () => {
  (await cookies()).delete(tokenName);
};

// Get auth token from cookie (server-side)
export const getAuthToken = async () => {
  return (await cookies()).get(tokenName)?.value;
};

export const setClientAuthCookie = async (token: string) => {
  (await cookies()).set(tokenName, token);
};

export const removeClientAuthCookie = async () => {
  (await cookies()).delete(tokenName);
};
