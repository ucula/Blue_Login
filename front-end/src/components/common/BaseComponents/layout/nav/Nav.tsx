import { Stack } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { type ReactNode } from "react";

export function Nav({ children }: { children: ReactNode; activeTab?: string }) {
  return (
    <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
      {/* Topbar */}
      <Stack
        direction="row"
        sx={{
          height: 70,
          // borderBottom: "1px solid #e2e8f0",
          px: 4,
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        {/* Topbar Right - User Profile with red badge */}
        <Stack direction="row" sx={{ alignItems: "center" }}>
          <AccountCircleOutlinedIcon
            sx={{ fontSize: 30, color: "#475569", cursor: "pointer" }}
          />
        </Stack>
      </Stack>

      {/* Content Body */}
      <Stack spacing={4} sx={{ p: 5, flexGrow: 1, overflowY: "auto" }}>
        {children}
      </Stack>
    </Stack>
  );
}
