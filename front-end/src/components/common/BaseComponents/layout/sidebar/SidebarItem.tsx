import { Button } from "@mui/material";
import { type ReactNode } from "react";

interface SidebarItemProps {
  label: string;
  icon: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarItem({
  label,
  icon,
  active = false,
  onClick,
}: SidebarItemProps) {
  return (
    <Button
      variant={active ? "contained" : "text"}
      fullWidth
      startIcon={icon}
      onClick={onClick}
      sx={{
        mb: 1,
        bgcolor: active ? "#1d4ed8" : "transparent",
        color: active ? "#ffffff" : "#000000ff",
        borderRadius: "10px",
        py: 1.5,
        px: 3,
        fontWeight: 700,
        fontSize: "20px",
        justifyContent: "flex-start",
        textTransform: "none",
        boxShadow: "none",
        "&:hover": {
          bgcolor: active ? "#1e40af" : "#f1f5f9",
          boxShadow: "none",
        },
      }}
    >
      {label}
    </Button>
  );
}
