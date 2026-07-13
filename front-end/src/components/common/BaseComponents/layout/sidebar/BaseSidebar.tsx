import { Stack, Typography } from "@mui/material";
import { type ReactNode } from "react";

interface BaseSidebarProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function BaseSidebar({ title, subtitle, children }: BaseSidebarProps) {
  return (
    <Stack
      spacing={4}
      sx={{
        width: 280,
        flexShrink: 0,
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
            fontSize: "35px",
            letterSpacing: "-0.5px",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "17px",
            color: "#64748b",
            fontWeight: 500,
          }}
        >
          {subtitle}
        </Typography>
      </Stack>

      {/* Sidebar Menu */}
      <Stack spacing={1} sx={{ mt: 2 }}>
        {children}
      </Stack>
    </Stack>
  );
}
