import { decodeToken } from "@/utility";
import { TOKEN_NAME } from "@/config";
import { AdminSidebar } from "./AdminSidebar";
import { UserSidebar } from "./UserSidebar";

export function Sidebar({ activeTab }: { activeTab?: string }) {
  const token = localStorage.getItem(TOKEN_NAME);
  const decoded = token ? decodeToken(token) : null;
  const isAdmin = decoded?.role === "admin";

  if (isAdmin) {
    return <AdminSidebar activeTab={activeTab} />;
  }
  return <UserSidebar activeTab={activeTab} />;
}
