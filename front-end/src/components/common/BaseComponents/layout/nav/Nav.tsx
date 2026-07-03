import { Box, Stack, Typography, Badge } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { type ReactNode } from "react";

export function Nav({
  children,
  activeTab,
}: {
  children: ReactNode;
  activeTab?: string;
}) {
  return (
    <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
      {/* Topbar */}
      <Box
        sx={{
          height: 70,
          borderBottom: "1px solid #e2e8f0",
          px: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Topbar Left Navigation */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Typography
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              fontSize: "18px",
              letterSpacing: "-0.3px",
            }}
          >
            ExpertAdmin
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "15px",
              color: "#0f172a",
              borderBottom: "3px solid #0f172a",
              pb: 2.2,
              mt: 2.2,
              cursor: "pointer",
            }}
          >
            {activeTab}
          </Typography>
        </Box>

        {/* Topbar Right - User Profile with red badge */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccountCircleOutlinedIcon
            sx={{ fontSize: 28, color: "#475569", cursor: "pointer" }}
          />
        </Box>
      </Box>

      {/* Content Body */}
      <Stack spacing={4} sx={{ p: 5, flexGrow: 1, overflowY: "auto" }}>
        {children}
      </Stack>
    </Stack>
  );
}
