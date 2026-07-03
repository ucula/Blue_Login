import { Box } from "@mui/material";
import { type ReactNode } from "react";
import { Sidebar } from "@/components/common/baseComponents/layout/sidebar/Sidebar";
import { Nav } from "@/components/common/baseComponents/layout/nav/Nav";

interface DashboardContainerProps {
  children: ReactNode;
  activeTab?: string;
}

export function DashboardContainer({
  children,
  activeTab = "Home",
}: DashboardContainerProps) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        bgcolor: "#ffffff",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Left Sidebar */}
      <Sidebar activeTab={activeTab} />

      {/* Main Content Area */}
      <Nav activeTab={activeTab}>{children}</Nav>
    </Box>
  );
}
