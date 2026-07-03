import { Box, Stack } from "@mui/material";
import { type ReactNode } from "react";

export function BaseCard({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        backgroundColor: "#ffffff",
        borderRadius: 6,
        border: "1px solid #e2e8f0",
        padding: "80px 70px",
        boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.04), 0px 2px 4px rgba(0, 0, 0, 0.02)",
      }}
    >
      <Stack spacing={5}>{children}</Stack>
    </Box>
  );
}
