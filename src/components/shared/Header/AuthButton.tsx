"use client";

import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Link from "next/link";

const AuthButton = () => {
  const token = useAppSelector(useCurrentToken);

  let isTokenValid = false;

  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      isTokenValid = decoded.exp ? currentTime < decoded.exp : false;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  return (
    <>
      <Link
        href={isTokenValid ? "/dashboard" : "/login"}
        className="flex items-center text-lg gap-5 hover:text-primary font-medium transition-colors"
      >
        <span className="ml-2 w-1.5 h-1.5 bg-primary" />
        {isTokenValid ? "Dashboard" : "Login"}
        {/* Square Box */}
      </Link>
    </>
  );
};

export default AuthButton;
