import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";

interface PasswordPolicyProps {
  password: string;
}

function PolicyItem({ met, label }: { met: boolean; label: string }) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      {met ? (
        <CheckCircleOutlineRoundedIcon
          sx={{ fontSize: 20, color: "#4caf50" }}
        />
      ) : (
        <RadioButtonUncheckedRoundedIcon
          sx={{ fontSize: 20, color: "#bdbdbd" }}
        />
      )}
      <Typography
        sx={{
          fontSize: "0.85rem",
          fontWeight: 500,
          color: met ? "#4caf50" : "#9e9e9e",
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
}

function getStrengthInfo(score: number) {
  switch (score) {
    case 1:
      return { label: "Weak", color: "#f44336", pct: 33 };
    case 2:
      return { label: "Medium", color: "#ff9800", pct: 66 };
    case 3:
      return { label: "Strong", color: "#4caf50", pct: 100 };
    default:
      return { label: "", color: "#e0e0e0", pct: 0 };
  }
}

export function PasswordPolicy({ password }: PasswordPolicyProps) {
  const hasLettersAndNumber =
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password);
  const hasSpecialChar = /[?!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMinLength = password.length >= 8;

  const score =
    (hasLettersAndNumber ? 1 : 0) +
    (hasSpecialChar ? 1 : 0) +
    (hasMinLength ? 1 : 0);

  const { label, color, pct } = getStrengthInfo(score);

  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        borderRadius: "12px",
        p: 2.5,
        border: "1px solid #eeeeee",
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "0.9rem",
          color: "#212529",
          mb: 1.5,
        }}
      >
        Security Strength
      </Typography>

      {/* Strength Gauge */}
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2 }}>
        <LinearProgress
          variant="determinate"
          value={pct}
          sx={{
            flex: 1,
            height: 6,
            borderRadius: 3,
            bgcolor: "#e0e0e0",
            "& .MuiLinearProgress-bar": {
              bgcolor: color,
              borderRadius: 3,
              transition: "transform 0.4s ease, background-color 0.3s ease",
            },
          }}
        />
        <Typography
          sx={{
            fontSize: "0.8rem",
            fontWeight: 700,
            color,
            minWidth: 50,
            textAlign: "right",
          }}
        >
          {password.length > 0 ? label : ""}
        </Typography>
      </Stack>

      {/* Policy Checklist */}
      <Stack spacing={1}>
        <PolicyItem met={hasLettersAndNumber} label="Contains uppercase, lowercase & number" />
        <PolicyItem met={hasSpecialChar} label="Contains special character" />
        <PolicyItem met={hasMinLength} label="At least 8 characters" />
      </Stack>
    </Box>
  );
}
