import { Box, Typography, CircularProgress } from "@mui/material";

export default function LoadingTemp({ label }: { label: string }) {
  return (
    <Box sx={{ height: "300px", placeItems: "center", alignContent: "center" }}>
      <CircularProgress sx={{ mb: 2 }} />
      <Typography variant="h6">{label}</Typography>
    </Box>
  );
}
