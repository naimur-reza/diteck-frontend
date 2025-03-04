"use client";

import {
  Briefcase,
  BriefcaseIcon,
  FileText,
  Globe,
  Handshake,
  LayoutDashboard,
  LogOutIcon,
  MessageSquare,
  Newspaper,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { removeClientAuthCookie } from "@/lib/auth";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Team Members",
    href: "/dashboard/team-members",
    icon: UserCheck,
  },
  {
    title: "Job Applications",
    href: "/dashboard/job-applications",
    icon: FileText,
  },
  {
    title: "Projects", // previews work
    href: "/dashboard/projects",
    icon: Briefcase,
  },
  {
    title: "Services",
    href: "/dashboard/services",
    icon: Globe,
  },
  {
    title: "Reviews",
    href: "/dashboard/reviews",
    icon: MessageSquare,
  },
  {
    title: "Query",
    href: "/dashboard/query",
    icon: MessageSquare,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Hiring",
    href: "/dashboard/hiring",
    icon: Handshake,
  },

  {
    title: "Blogs",
    href: "/dashboard/blogs",
    icon: Newspaper,
  },
];

export function AppSidebar() {
  const pathname = usePathname(); // Get the current route
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    // Clear user from Redux
    dispatch(logout());

    // Remove the auth cookie
    removeClientAuthCookie();

    // Show success message
    toast.success("Logged out successfully");

    // Redirect to login page
    router.push("/login");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BriefcaseIcon className="size-4" />
              </div>
              <Link href={"/"} className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">EnaEma</span>
                <span className="text-xs text-muted-foreground">Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navigation.map((item) => {
            const isActive = pathname === item.href; // Check if the route is active

            return (
              <SidebarMenuItem key={item.href} className="mx-2">
                <SidebarMenuButton asChild>
                  <Link
                    href={item.href}
                    className={`pl-5 py-5 flex items-center gap-2 rounded-md  ${
                      isActive ? "bg-primary text-white" : ""
                    }`}
                  >
                    <item.icon className="size-6" />
                    <span className="text-base">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOutIcon className="size-8" />
              <span className="text-base cursor-pointer">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
