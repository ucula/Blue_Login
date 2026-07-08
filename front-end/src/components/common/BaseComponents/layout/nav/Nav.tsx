import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { type ReactNode } from "react";
import useNav from "./useNav";

function menuItem(
  label: string,
  icon: ReactNode,
  onClick: () => void,
  color = "#334155",
  hoverBg = "#f8fafc",
  extraSx: SxProps<Theme> = {},
) {
  return (
    <MenuItem
      onClick={onClick}
      sx={{
        mx: 1,
        borderRadius: "10px",
        py: 1.2,
        px: 1.5,
        transition: "all 0.15s ease",
        "&:hover": { bgcolor: hoverBg },
        ...extraSx,
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </MenuItem>
  );
}

export function Nav({ children }: { children: ReactNode; activeTab?: string }) {
  const { open, anchorEl, handleClose, handleClick, handleLogout } = useNav();

  return (
    <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
      {/* Topbar */}
      <Stack
        direction="row"
        sx={{
          height: 70,
          px: 4,
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        {/* Topbar Right - User Profile */}
        <Stack direction="row" sx={{ alignItems: "center" }}>
          <IconButton
            onClick={handleClick}
            disableRipple
            sx={{
              p: 0.5,
              borderRadius: "12px",
              gap: 1,
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#f1f5f9",
              },
              ...(open && {
                bgcolor: "#f1f5f9",
              }),
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#1d4ed8",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}
            >
              A
            </Avatar>
            <KeyboardArrowDownRoundedIcon
              sx={{
                fontSize: 20,
                color: "#64748b",
                transition: "transform 0.2s ease",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </IconButton>

          <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
            {/* User Info Header */}
            <Box sx={{ px: 2.5, pt: 2, pb: 1.5 }}>
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "center" }}
              >
                <Avatar
                  sx={{
                    width: 42,
                    height: 42,
                    bgcolor: "#1d4ed8",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                  }}
                >
                  A
                </Avatar>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: "#0f172a",
                      lineHeight: 1.3,
                    }}
                  >
                    Admin
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: "#94a3b8",
                      fontWeight: 500,
                    }}
                  >
                    admin@expertadmin.com
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Divider sx={{ my: 1, borderColor: "#f1f5f9" }} />

            {/* Menu Items */}
            {/* Logout */}
            {menuItem(
              "Logout",
              <LogoutRoundedIcon sx={{ fontSize: 20, color: "#ef4444" }} />,
              handleLogout,
              "#ef4444",
              "#fef2f2",
              { mb: 1 },
            )}
          </Menu>
        </Stack>
      </Stack>

      {/* Content Body */}
      <Stack spacing={4} sx={{ p: 5, flexGrow: 1, overflowY: "auto" }}>
        {children}
      </Stack>
    </Stack>
  );
}
