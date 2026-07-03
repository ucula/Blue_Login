import { Stack } from "@mui/material";
import { type ReactNode } from "react";

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100dvh",
        width: "100vw",
        background: "radial-gradient(circle at 50% 30%, #ffffff 0%, #edf2f7 60%, #e2e8f0 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {children}
    </Stack>
  );
}
