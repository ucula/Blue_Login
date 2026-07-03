import { Box, CircularProgress, Typography, Stack } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";
import { PageContainer } from "@/components/common/baseComponents/layout";
import { BaseCard } from "@/components/common/baseComponents/card";

export default function sendingTemp() {
  return (
    <PageContainer>
      <BaseCard>
        <Stack
          spacing={4}
          sx={{ alignItems: "center", textAlign: "center", py: 2 }}
        >
          {/* Centered Circular Loader with Envelope */}
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              width: 120,
              height: 120,
            }}
          >
            {/* Background track circle */}
            <CircularProgress
              variant="determinate"
              value={100}
              size={120}
              thickness={4}
              sx={{ color: "#f1f5f9" }}
            />
            {/* Active spinning progress */}
            <CircularProgress
              variant="indeterminate"
              size={120}
              thickness={4}
              sx={{
                color: "#0f172a",
                position: "absolute",
                left: 0,
                "& .MuiCircularProgress-circle": {
                  strokeLinecap: "round",
                },
              }}
            />
            {/* Centered envelope icon */}
            <MailOutlineIcon
              sx={{
                position: "absolute",
                fontSize: "44px",
                color: "#94a3b8",
              }}
            />
          </Box>

          {/* Heading & Subtitle */}
          <Stack spacing={2}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#0f172a",
                fontSize: "42px",
              }}
            >
              Sending...
            </Typography>
            <Typography
              sx={{
                color: "#475569",
                fontSize: "19px",
                lineHeight: 1.6,
                maxWidth: "340px",
                margin: "0 auto",
              }}
            >
              Please wait while we prepare your verification link
            </Typography>
          </Stack>

          {/* Animated Loading Dots */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              pt: 2,
              "@keyframes pulse": {
                "0%, 100%": {
                  opacity: 0.3,
                  transform: "scale(0.8)",
                },
                "50%": {
                  opacity: 1,
                  transform: "scale(1.2)",
                },
              },
            }}
          >
            {[0, 1, 2].map((index) => (
              <Box
                key={index}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "#475569",
                  animation: "pulse 1.4s infinite ease-in-out",
                  animationDelay: `${index * 0.2}s`,
                }}
              />
            ))}
          </Box>
        </Stack>
      </BaseCard>
    </PageContainer>
  );
}
