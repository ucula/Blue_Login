import { Box, Typography, CircularProgress } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import useVerify from "@/components/features/user/addUser/verify/useVerify";
import MainTemp from "@/components/common/baseComponents/mainTemp";

export default function showVerify() {
  const { isPending, isError } = useVerify();
  return (
    <MainTemp
      content={
        <>
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
        </>
      }
    />
  );
}
