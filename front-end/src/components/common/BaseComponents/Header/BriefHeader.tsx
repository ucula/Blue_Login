import { Stack, Typography } from "@mui/material";

interface BriefHeaderProps {
  title: string;
  subtitle: string;
}

export function BriefHeader({ title, subtitle }: BriefHeaderProps) {
  return (
    <Stack spacing={1}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          color: "#0f172a",
          fontSize: "36px",
          letterSpacing: "-1px",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: "#475569",
          fontSize: "16px",
          fontWeight: 500,
        }}
      >
        {subtitle}
      </Typography>
    </Stack>
  );
}
