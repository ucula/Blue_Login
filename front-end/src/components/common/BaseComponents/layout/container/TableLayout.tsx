import { Box, Grid } from "@mui/material";
import { type ReactNode } from "react";

export function TableContainer({ children, sx }: { children: ReactNode; sx?: any }) {
  return (
    <Box
      sx={{
        border: "1px solid #cbd5e1",
        borderRadius: "8px",
        overflow: "hidden",
        bgcolor: "#ffffff",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export function TableHeaderRow({ children, sx }: { children: ReactNode; sx?: any }) {
  return (
    <Grid
      container
      sx={{
        bgcolor: "#f8fafc",
        py: 1.8,
        px: 3,
        borderBottom: "1px solid #cbd5e1",
        alignItems: "center",
        ...sx,
      }}
    >
      {children}
    </Grid>
  );
}

export function TableBodyRow({
  children,
  sx,
  onClick,
}: {
  children: ReactNode;
  sx?: any;
  onClick?: () => void;
}) {
  return (
    <Grid
      container
      onClick={onClick}
      sx={{
        py: 2.2,
        px: 3,
        borderBottom: "1px solid #e2e8f0",
        alignItems: "center",
        "&:last-child": {
          borderBottom: "none",
        },
        ...sx,
      }}
    >
      {children}
    </Grid>
  );
}
