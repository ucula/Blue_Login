import { Box, Link } from "@mui/material";

interface ForgotPasswordProps {
  onClick: () => void;
  label: string;
}

export function ForgotPassword({ onClick, label }: ForgotPasswordProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1.5 }}>
      <Link
        component="button"
        onClick={onClick}
        underline="hover"
        sx={{
          fontSize: "18px",
          fontWeight: 600,
          color: "#0a58ca",
        }}
      >
        {label}
      </Link>
    </Box>
  );
}
