import { Box, Typography } from "@mui/material";

interface AuthTitleProps {
  title: string;
  subtitle: string;
}

export function AuthTitle({ title, subtitle }: AuthTitleProps) {
  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ fontWeight: 800, mb: 2, color: "#121416" }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#272727ff", fontSize: "23px", mb: 1 }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}
