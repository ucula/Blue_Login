import { Box, Typography, Button, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import useVerify from "./useVerify";

export default function showVerify() {
  const { isPending, isSuccess, isError, redirectReset } = useVerify();
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
        {isPending && (
          <Box sx={{ justifyItems: "center" }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Verifying Account...
            </Typography>
            <Typography color="textSecondary">
              Please wait while we verify your email token.
            </Typography>
          </Box>
        )}

        {isSuccess && (
          <Box sx={{ justifyItems: "center" }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Account Verified!
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 3 }}>
              Your email has been successfully verified. You can now log in.
            </Typography>
            <Button variant="contained" fullWidth onClick={redirectReset}>
              Input new password
            </Button>
          </Box>
        )}

        {isError && (
          <Box sx={{ justifyItems: "center" }}>
            <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Verification Failed
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 3 }}>
              The verification token is invalid, expired, or has already been
              used.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
