import { Button } from "@mui/material";
import { type ReactNode } from "react";

interface BaseButtonProps {
  children: ReactNode;
  onClick?: () => void;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant?: "contained" | "outlined" | "text";
  fullWidth?: boolean;
  bgcolor?: string;
  color?: string;
  weight?: number | string;
  fontSize?: string;
  boxShadow?: string;
  disabled?: boolean;
  sx?: any;
}

export function BaseButton({
  children,
  onClick,
  startIcon,
  endIcon,
  variant = "contained",
  fullWidth = false,
  bgcolor = "#000000",
  color = "#ffffff",
  weight = 700,
  fontSize = "14px",
  boxShadow = "none",
  disabled = false,
  sx,
}: BaseButtonProps) {
  const finalBgColor = variant === "text" ? "transparent" : bgcolor;
  const finalColor =
    variant === "text"
      ? color === "#ffffff"
        ? "#0a58ca"
        : color
      : color;
  const finalWeight = variant === "text" ? 600 : weight;
  const finalFontSize = variant === "text" ? "18px" : fontSize;

  return (
    <Button
      variant={variant}
      fullWidth={fullWidth}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      sx={{
        bgcolor: finalBgColor,
        color: finalColor,
        borderRadius: variant === "text" ? "4px" : "8px",
        px: variant === "text" ? 1.5 : 3,
        py: variant === "text" ? 0.8 : 1.5,
        fontWeight: finalWeight,
        fontSize: finalFontSize,
        boxShadow: variant === "text" ? "none" : boxShadow,
        textTransform: "none",
        "&:hover": {
          bgcolor:
            variant === "text"
              ? "rgba(10, 88, 202, 0.04)"
              : bgcolor === "#000000"
                ? "#1e293b"
                : undefined,
          opacity: variant === "text" ? 1 : 0.9,
          boxShadow: variant === "text" ? "none" : boxShadow,
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
}
