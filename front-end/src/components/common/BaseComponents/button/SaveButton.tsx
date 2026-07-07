import { BaseButton } from "./BaseButton";
import { SaveIcon } from "../icons";

interface ButtonProps {
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  sx?: any;
}

export function SaveButton({ onClick, fullWidth = false, disabled, sx }: ButtonProps) {
  return (
    <BaseButton
      onClick={onClick}
      disabled={disabled}
      startIcon={<SaveIcon />}
      bgcolor="#10b981"
      color="#ffffff"
      fontSize="18px"
      fullWidth={fullWidth}
      sx={{
        textTransform: "uppercase",
        "&:hover": {
          bgcolor: "#059669",
        },
        ...sx,
      }}
    >
      SAVE
    </BaseButton>
  );
}
