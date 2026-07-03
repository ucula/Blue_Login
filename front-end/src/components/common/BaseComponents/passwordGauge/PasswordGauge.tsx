import { Box, LinearProgress, Typography } from "@mui/material";

interface PasswordGaugeProps {
  strength: number;
}

export default function PasswordGauge({ strength }: PasswordGaugeProps) {
  const getStrengthLabelAndColor = (val: number) => {
    switch (val) {
      case 1:
        return {
          label: "Medium",
          color: "warning" as const,
          hex: "#ff9800",
          pct: 50,
        };
      case 2:
        return {
          label: "Good",
          color: "info" as const,
          hex: "#2196f3",
          pct: 75,
        };
      case 3:
        return {
          label: "Strong",
          color: "success" as const,
          hex: "#4caf50",
          pct: 100,
        };
      default:
        return {
          label: "Weak",
          color: "error" as const,
          hex: "#f44336",
          pct: 25,
        };
    }
  };

  const { label, hex, pct } = getStrengthLabelAndColor(strength);

  return (
    <Box sx={{ width: "100%", mt: 1, mb: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
        <Typography variant="caption" sx={{ color: hex, fontWeight: "bold" }}>
          {label}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{
          height: 6,
          borderRadius: 3,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            backgroundColor: hex,
            borderRadius: 3,
          },
        }}
      />
    </Box>
  );
}
