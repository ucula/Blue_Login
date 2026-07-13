import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { PATHS, TABS } from "@/constants";
import { SidebarItem } from "./SidebarItem";
import { BaseSidebar } from "./BaseSidebar";

export function UserSidebar({ activeTab }: { activeTab?: string }) {
  const navigate = useNavigate();
  return (
    <BaseSidebar title="UserPanel" subtitle="Personal Portal">
      <SidebarItem
        label="Task"
        icon={<HomeIcon />}
        active={activeTab === TABS.TASK}
        onClick={() => navigate(PATHS.USER_HOME)}
      />
    </BaseSidebar>
  );
}
