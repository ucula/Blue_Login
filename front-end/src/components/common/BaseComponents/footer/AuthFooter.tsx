import { Stack, Typography, Link } from "@mui/material";

interface AuthFooterProps {
  text: string;
  linkText: string;
  onClick: () => void;
}

export function AuthFooter({ text, linkText, onClick }: AuthFooterProps) {
  return (
    <Stack sx={{ mt: 3.5 }}>
      <Typography variant="body2" sx={{ color: "#495057", fontWeight: 500 }}>
        {text}{" "}
        <Link
          component="button"
          onClick={onClick}
          sx={{
            fontWeight: 600,
            color: "#0a58ca",
            textDecoration: "underline",
            "&:hover": { color: "#0a58ca" },
          }}
        >
          {linkText}
        </Link>
      </Typography>
    </Stack>
  );
}
