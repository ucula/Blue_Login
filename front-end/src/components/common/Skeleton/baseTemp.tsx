import { Box, Typography } from "@mui/material";
import { type ReactNode } from "react";

interface BaseTempProps {
  icon: ReactNode;
  label: string;
  labelColor?: string;
}

export default function BaseTemp({ icon, label, labelColor = "#64748b" }: BaseTempProps) {
  return (
    <Box
      sx={{
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icon}
      <Typography variant="h6" sx={{ color: labelColor }}>
        {label}
      </Typography>
    </Box>
  );
}
