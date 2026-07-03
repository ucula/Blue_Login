import { Box, Button, Typography, Stack, Divider, Link } from "@mui/material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import LaunchIcon from "@mui/icons-material/Launch";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PageContainer } from "@/components/common/baseComponents/layout";
import { BaseCard } from "@/components/common/baseComponents/card";
import SendingTemp from "@/components/common/skeleton/sendingTemp";
import useSendTemp from "./useSendTemp";
import { useNavigate } from "react-router-dom";

export default function sendTemp({
  email,
  path,
}: {
  email: string;
  path?: string;
}) {
  const { isPending, handleSendEmail } = useSendTemp(email, path);
  const navigate = useNavigate();

  return isPending ? (
    <SendingTemp />
  ) : (
    <PageContainer>
      {/* Main Sent Card */}
      <BaseCard>
        <Stack spacing={4}>
          {/* Centered Layered Email Icon */}
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            {/* Circular envelope with checkmark */}
            <Box
              sx={{
                zIndex: 2,
                width: 170,
                height: 170,
                borderRadius: "50%",
                border: "2px solid #bcd7f5",
                padding: "6px",
                backgroundColor: "#ffffff",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "#ecf4fd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MarkEmailReadIcon sx={{ fontSize: 60, color: "#1976d2" }} />
              </Box>
            </Box>
          </Box>

          {/* Heading */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              textAlign: "center",
              fontSize: "42px",
            }}
          >
            Check your email
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              color: "#475569",
              textAlign: "center",
              fontSize: "19px",
              lineHeight: 1.6,
            }}
          >
            We have sent a verification link to your email address. <br />
            Please check your inbox and follow the instructions.
          </Typography>

          {/* Action Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              window.open("https://mail.google.com", "_blank");
            }}
            sx={{
              backgroundColor: "#000000",
              color: "#ffffff",
              borderRadius: "10px",
              padding: "16px",
              fontSize: "19px",
              fontWeight: 600,
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#1f2937",
                boxShadow: "none",
              },
            }}
          >
            Open Email App <LaunchIcon sx={{ fontSize: 18 }} />
          </Button>

          {/* Resend Link */}
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "#475569",
              fontWeight: 500,
              fontSize: "17px",
            }}
          >
            Didn't receive the email?{" "}
            <Link
              component="button"
              onClick={handleSendEmail}
              sx={{
                color: "#0c66e4",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "15px",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Resend Email
            </Link>
          </Typography>

          <Divider sx={{ borderColor: "#f1f5f9", my: 1 }} />

          {/* Back to Login Link */}
          <Stack direction="row" sx={{ justifyContent: "center" }}>
            <Link
              component="button"
              onClick={() => navigate("/login")}
              sx={{
                color: "#475569",
                fontWeight: 600,
                fontSize: "17px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 12px",
                border: "1px dashed transparent",
                borderRadius: "4px",
                "&:hover": {
                  color: "#0f172a",
                  borderColor: "#1976d2",
                },
              }}
            >
              <ArrowBackIcon sx={{ fontSize: 16 }} /> Back to Login
            </Link>
          </Stack>
        </Stack>
      </BaseCard>

      {/* Footer System Info */}
      <Stack
        direction="row"
        spacing={4}
        sx={{
          mt: 4,
          justifyContent: "center",
          alignItems: "center",
          color: "#94a3b8",
        }}
      ></Stack>
    </PageContainer>
  );
}
