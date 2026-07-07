import { BaseButton } from "./BaseButton";

interface ButtonProps {
  onClick?: () => void;
  fullWidth?: boolean;
  sx?: any;
}

export function BackButton({ onClick, fullWidth = false, sx }: ButtonProps) {
  return (
    <BaseButton
      variant="contained"
      onClick={onClick}
      color="#4B5563"
      bgcolor="#F3F4F6"
      fontSize="18px"
      fullWidth={fullWidth}
      sx={{
        py: 1.5,
        borderRadius: "8px",
        "&:hover": {
          bgcolor: "#E5E7EB",
        },
        ...sx,
      }}
    >
      BACK
    </BaseButton>
  );
}
