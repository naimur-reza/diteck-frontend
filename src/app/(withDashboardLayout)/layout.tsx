import { AppSidebar } from "@/components/dashboard/Sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const layout = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className={cn("bg-background", className)} {...props}>
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
    </SidebarProvider>
  );
};

export default layout;
