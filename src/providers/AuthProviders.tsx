"use client";

import type React from "react";

import { removeClientAuthCookie, setClientAuthCookie } from "@/lib/auth";
import { setUser } from "@/redux/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch();

  // Check for token in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);

        // If we have a token in the stored user data
        if (userData.token) {
          // Set the user in Redux
          dispatch(setUser(userData));

          // Also set the cookie for middleware protection
          setClientAuthCookie(userData.token);
        }
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        localStorage.removeItem("user");
        removeClientAuthCookie();
      }
    }
  }, [dispatch]);

  return children;
}
