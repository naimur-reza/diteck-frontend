import { AppSidebar } from "@/components/dashboard/Sidebar/Sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getAuthToken } from "@/lib/auth";
import { cn } from "@/lib/utils";
import AuthProvider from "@/provides/AuthProviders";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const token = await getAuthToken();
  // If no token is found, redirect to login
  if (!token) {
    redirect("/login");
  }
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

export default layout;
