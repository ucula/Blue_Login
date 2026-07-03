import React from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

interface StatusCardProps {
  type: "success" | "error" | "pending";
  title: string;
  description: string | React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
}

export function StatusCard({
  type,
  title,
  description,
  buttonText,
  onButtonClick,
}: StatusCardProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        px: 2,
        py: 1,
      }}
    >
      {/* Icon Section */}
      {type === "success" && (
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            backgroundColor: "#22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 4,
          }}
        >
          <CheckIcon
            sx={{
              fontSize: 40,
              color: "#ffffff",
              stroke: "#ffffff",
              strokeWidth: 1.5,
            }}
          />
        </Box>
      )}

      {type === "error" && (
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: "#fef2f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #fee2e2",
            mb: 4,
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: "#dc2626",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PriorityHighIcon
              sx={{
                fontSize: 32,
                color: "#ffffff",
                fontWeight: "bold",
              }}
            />
          </Box>
        </Box>
      )}

      {type === "pending" && (
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            width: 80,
            height: 80,
            mb: 4,
          }}
        >
          <CircularProgress
            variant="determinate"
            value={100}
            size={80}
            thickness={4}
            sx={{ color: "#f1f5f9" }}
          />
          <CircularProgress
            variant="indeterminate"
            size={80}
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
        </Box>
      )}

      {/* Typography Content */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          color: "#0f172a",
          fontSize: "32px",
          mb: 2.5,
          letterSpacing: "-0.5px",
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          color: "#475569",
          fontSize: "18px",
          lineHeight: 1.6,
          mb: buttonText ? 5 : 1,
          maxWidth: "380px",
          fontWeight: 500,
        }}
      >
        {description}
      </Typography>

      {/* Button Section */}
      {buttonText && onButtonClick && (
        <Button
          variant="contained"
          fullWidth
          onClick={onButtonClick}
          sx={{
            backgroundColor: type === "error" ? "#0f172a" : "#1d4ed8",
            "&:hover": {
              backgroundColor: type === "error" ? "#1e293b" : "#1e40af",
            },
            borderRadius: "10px",
            py: 1.8,
            fontSize: "16px",
            fontWeight: 700,
            textTransform: type === "error" ? "none" : "uppercase",
            letterSpacing: type === "error" ? "normal" : "0.5px",
            boxShadow: "none",
          }}
        >
          {buttonText}
        </Button>
      )}
    </Box>
  );
}
