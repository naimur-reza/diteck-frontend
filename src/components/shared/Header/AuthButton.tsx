"use client";

import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import cn from "classnames";
import { motion } from "framer-motion";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthButton = ({ className }: { className?: string }) => {
  const token = useAppSelector(useCurrentToken);
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

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

  const linkPath = isTokenValid ? "/dashboard" : "/login";
  const linkText = isTokenValid ? "Dashboard" : "Login";

  // Check if we're in the mobile sidebar by looking at the className
  const isInSidebar = className?.includes("w-full");

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn("", className)}
    >
      {isInSidebar ? (
        // Sidebar version - full width button
        <Link
          href={linkPath}
          className={cn(
            "flex items-center  justify-center w-full text-lg font-medium py-3 px-4 rounded-lg transition-colors",
            isDashboard && isTokenValid
              ? "bg-primary text-white"
              : "bg-primary/10 text-primary hover:bg-primary/20"
          )}
        >
          {linkText}
        </Link>
      ) : (
        // Desktop nav version - inline with other nav items
        <Link
          href={linkPath}
          className="flex ml-2 bg-primary text-white px-4 py-2 rounded-lg items-center text-lg gap-2 hover:text-primary font-medium transition-colors"
        >
          {linkText}
        </Link>
      )}
    </motion.div>
  );
};

export default AuthButton;
