import { Stack, Typography } from "@mui/material";

export function UserProfileHeader() {
  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{ alignItems: "center", mb: 4 }}
    >
      <Stack spacing={1}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "#0f172a",
            fontSize: "32px",
            letterSpacing: "-0.5px",
          }}
        >
          User Profile
        </Typography>
        <Typography
          sx={{
            color: "#64748b",
            fontSize: "16px",
            fontWeight: 500,
          }}
        >
          Profile identification and administrative details for account
          management.
        </Typography>
      </Stack>
    </Stack>
  );
}
