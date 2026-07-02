import { Button, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import MainTemp from "@/components/common/baseComponents/mainTemp";
import SendingTemp from "@/components/common/skeleton/sendingTemp";
import useSendTemp from "./useSendTemp";

export default function sendTemp({
  email,
  path,
}: {
  email: string;
  path?: string;
}) {
  const { isPending, handleSendEmail } = useSendTemp(email, path);
  return isPending ? (
    <SendingTemp />
  ) : (
    <MainTemp
      content={
        <>
          <EmailIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Check Your Mailbox
          </Typography>
          <Typography color="textSecondary" sx={{ mb: 3 }}>
            We have sent a verification link to <strong>{email}</strong>. Please
            click the link in the email to proceed
          </Typography>
          <Button onClick={handleSendEmail}>Send Again</Button>
        </>
      }
    />
  );
}
