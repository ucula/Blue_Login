import { Box, Stack, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { SidebarItem } from "./SidebarItem";

export function Sidebar({ activeTab }: { activeTab?: string }) {
  return (
    <Stack
      spacing={4}
      sx={{
        width: 280,
        bgcolor: "#f8fafc",
        borderRight: "1px solid #e2e8f0",
        p: 3,
      }}
    >
      {/* Logo Section */}
      <Stack spacing={0.5}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: "#0f172a",
            fontSize: "24px",
            letterSpacing: "-0.5px",
          }}
        >
          ExpertAdmin
        </Typography>
        <Typography
          sx={{
            fontSize: "13px",
            color: "#64748b",
            fontWeight: 500,
          }}
        >
          System Management
        </Typography>
      </Stack>

      {/* Add in new sidebaritem here */}
      {/* Sidebar Menu */}
      <Box sx={{ mt: 2 }}>
        <SidebarItem
          label="Home"
          icon={<HomeIcon />}
          active={activeTab === "Home"}
        />
      </Box>
    </Stack>
  );
}
