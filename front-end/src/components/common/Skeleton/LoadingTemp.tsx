import { Box, Typography } from "@mui/material";

export default function LoadingTemp({ label }: { label: string }) {
  return (
    <Box sx={{ height: "300px", placeItems: "center", alignContent: "center" }}>
      <Typography variant="h6">{label}</Typography>
    </Box>
  );
}
