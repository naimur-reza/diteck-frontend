"use client";
import { AppSidebar } from "@/components/dashboard/Sidebar/Sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AuthProvider from "@/provides/AuthProviders";
import { cn } from "@/lib/utils";
import useFetchUser from "@/hooks/useFetchUser";

const DashboardLayout = ({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string;
}) => {
  const {} = useFetchUser(token);

  return (
    <SidebarProvider>
      <AppSidebar />
      <AuthProvider>
        <SidebarInset className={cn("bg-background")}>
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">EnaEma Dashboard</h2>
            </div>
          </header>
          <main className="flex-1">
            <div className="container flex-1 p-6">{children}</div>
          </main>
        </SidebarInset>
      </AuthProvider>
    </SidebarProvider>
  );
};

export default DashboardLayout;
