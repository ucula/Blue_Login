import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router-dom";
import { PATHS, TABS } from "@/constants";
import { SidebarItem } from "./SidebarItem";
import { BaseSidebar } from "./BaseSidebar";

export function AdminSidebar({ activeTab }: { activeTab?: string }) {
  const navigate = useNavigate();
  return (
    <BaseSidebar title="ExpertAdmin" subtitle="System Management">
      <SidebarItem
        label="Dashboard"
        icon={<HomeIcon />}
        active={activeTab === TABS.DASHBOARD}
        onClick={() => navigate(PATHS.ADMIN_HOME)}
      />
      <SidebarItem
        label="Task"
        icon={<AssignmentIcon />}
        active={activeTab === TABS.TASK}
        onClick={() => navigate(PATHS.USER_HOME)}
      />
    </BaseSidebar>
  );
}
