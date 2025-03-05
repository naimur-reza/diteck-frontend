import { getAuthToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardLayout from "./_components/DashboardLayout"; // Import client component

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const token = await getAuthToken();

  // Redirect if no token
  if (!token) {
    redirect("/login");
  }

  return <DashboardLayout token={token}>{children}</DashboardLayout>;
};

export default Layout;
