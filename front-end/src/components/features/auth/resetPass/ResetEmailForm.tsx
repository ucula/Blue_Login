import {
  Box,
  Typography,
  InputAdornment,
  Link,
  Stack,
  Divider,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendingTemp from "@/components/common/skeleton/sendingTemp";
import { PageContainer } from "@/components/common/baseComponents/layout";
import { BaseCard } from "@/components/common/baseComponents/card";
import { AuthInput } from "@/components/common/baseComponents/input";
import { BaseButton } from "@/components/common/baseComponents/button";
import useMain from "./useResetEmail";
import SendTemp from "@/components/common/baseComponents/sendTemp/sendTemp";

export default function ResetEmailForm() {
  const {
    form,
    errForm,
    isPending,
    isSuccess,
    handleCancel,
    setForm,
    handleNext,
  } = useMain();

  if (isPending) return <SendingTemp />;
  if (isSuccess) return <SendTemp email={form.email} path="/reset" />;
  return (
    <PageContainer>
      <BaseCard>
        {/* Header Title & Subtitle */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              fontSize: "42px",
              mb: 1.5,
            }}
          >
            Reset Password
          </Typography>
          <Typography
            sx={{
              color: "#475569",
              fontSize: "19px",
              lineHeight: 1.6,
            }}
          >
            Enter your email address and we'll send you a link to reset your
            password.
          </Typography>
        </Box>

        {/* Form Fields */}
        <Stack spacing={5}>
          <AuthInput
            fullWidth
            label="Email Address"
            placeholder="name@company.com"
            error={!!errForm.email}
            helperText={errForm.email}
            value={form.email ?? ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon sx={{ color: "#adb5bd" }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <BaseButton
            fullWidth
            onClick={handleNext}
            fontSize="26px"
            weight={600}
            sx={{ borderRadius: "12px", py: "12px" }}
          >
            Send Reset Link
          </BaseButton>

          <Divider sx={{ borderColor: "#e2e8f0" }} />

          {/* Back to Login Link */}
          <Stack direction="row" sx={{ justifyContent: "center" }}>
            <Link
              component="button"
              onClick={handleCancel}
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
    </PageContainer>
  );
}
