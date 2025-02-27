"use client";

import {
  BriefcaseIcon,
  FileTextIcon,
  Globe,
  Handshake,
  HomeIcon,
  LogOutIcon,
  Network,
  Users,
} from "lucide-react";
import Link from "next/link";
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

// This is sample navigation data
const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Job Applications",
    href: "/dashboard/job-applications",
    icon: FileTextIcon,
  },
  {
    title: "Team Members",
    href: "/dashboard/post-job",
    icon: Network,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Careers",
    href: "/dashboard/careers",
    icon: Handshake,
  },
  {
    title: "Blogs",
    href: "/dashboard/blogs",
    icon: Globe,
  },
];

export function AppSidebar() {
  const handleLogout = () => {
    console.log("Logging out...");
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
          {navigation.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild>
                <Link href={item.href} className="py-5">
                  <item.icon className="size-8" />
                  <span className="text-base">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
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
