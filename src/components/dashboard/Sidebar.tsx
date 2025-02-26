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
    href: "/job-applications",
    icon: FileTextIcon,
  },
  {
    title: "Team Members",
    href: "/post-job",
    icon: Network,
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
  {
    title: "Careers",
    href: "/careers",
    icon: Handshake,
  },
  {
    title: "Blogs",
    href: "/blogs",
    icon: Globe,
  },
];

export function AppSidebar() {
  const handleLogout = () => {
    // Add your logout logic here
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
                <Link href={item.href}>
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
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
              <LogOutIcon className="size-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
