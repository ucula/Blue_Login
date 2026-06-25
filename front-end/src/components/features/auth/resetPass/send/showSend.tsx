import { Box, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import useSend from "./useSend";

export default function showSend() {
  const { email } = useSend();
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
        <EmailIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Check Your Mailbox
        </Typography>
        <Typography color="textSecondary" sx={{ mb: 3 }}>
          We have sent a verification link to{" "}
          <strong>{email || "your registered email"}</strong>. Please click the
          link in the email to activate your account.
        </Typography>
      </Box>
    </Box>
  );
}
