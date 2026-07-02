import { Box, CircularProgress, Grid, Typography } from "@mui/material";

export default function sendingTemp() {
  return (
    <Box
      sx={{ alignContent: "center", justifyItems: "center", height: "700px" }}
    >
      <Box
        sx={{
          padding: "80px 90px",
          bgcolor: "white",
          width: "30%",
        }}
      >
        <Box sx={{ justifyItems: "center" }}>
          <Grid>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Sending
            </Typography>
            <Typography color="textSecondary">
              Please wait while we are sending your link.
            </Typography>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
