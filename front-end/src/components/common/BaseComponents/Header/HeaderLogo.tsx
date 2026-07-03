import { Typography, Stack } from "@mui/material";
import ShieldIcon from "@mui/icons-material/Security";

export function HeaderLogo({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  if (subtitle) {
    return (
      <Stack sx={{ mb: 6, textAlign: "center", alignItems: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            letterSpacing: "-1px",
            color: "#000000",
            fontSize: "36px",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#6c757d", mt: 1, fontSize: "18px", fontWeight: 500 }}
        >
          {subtitle}
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack direction="row" spacing={1.5} sx={{ mb: 8, alignItems: "center" }}>
      <ShieldIcon sx={{ fontSize: 50, color: "#000000" }} />
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, letterSpacing: "-0.5px", color: "#000000" }}
      >
        {title}
      </Typography>
    </Stack>
  );
}
