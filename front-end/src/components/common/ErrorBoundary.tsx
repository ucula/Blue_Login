import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import { PATHS } from "@/constants";
import { Box, Typography, Button, Container } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  
  let title = "An Error Occurred";
  let message = "Something went wrong on our end. Please try again later.";
  let code = "Error";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      code = "404";
      title = "Page Not Found";
      message = "The page you are looking for does not exist or has been moved.";
    } else {
      code = String(error.status);
      title = error.statusText || title;
      message = error.data?.message || message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        color: "#f8fafc",
        padding: 3,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "5rem", sm: "7rem" },
            fontWeight: 900,
            background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
            lineHeight: 1,
          }}
        >
          {code}
        </Typography>
        
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: "#f1f5f9",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#94a3b8",
            mb: 4,
            fontSize: "1.1rem",
            lineHeight: 1.6,
          }}
        >
          {message}
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate(PATHS.LOGIN)}
          sx={{
            background: "linear-gradient(to right, #2563eb, #4f46e5)",
            color: "#ffffff",
            fontWeight: 600,
            padding: "12px 32px",
            borderRadius: "50px",
            textTransform: "none",
            fontSize: "1rem",
            boxShadow: "0 10px 20px -10px rgba(79, 70, 229, 0.5)",
            "&:hover": {
              background: "linear-gradient(to right, #1d4ed8, #4338ca)",
              boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.7)",
            },
          }}
        >
          Go Back Home
        </Button>
      </Container>
    </Box>
  );
}
