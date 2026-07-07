import React from "react";
import { Box, Stack, Typography } from "@mui/material";

interface InfoBlockProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  color?: string;
}

export function InfoBlock({ icon, label, value, color }: InfoBlockProps) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        alignItems: "center",
        p: 2,
        borderRadius: "10px",
        transition: "all 0.2s ease",
        width: "100%",
      }}
    >
      {/* Icon Wrapper */}
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      {/* Text Info */}
      <Stack spacing={0.5} sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#64748b",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {label}
        </Typography>
        {typeof value === "string" || typeof value === "number" || !value ? (
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              color: color,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {value || "Not provided"}
          </Typography>
        ) : (
          value
        )}
      </Stack>
    </Stack>
  );
}
