import { BaseButton } from "./BaseButton";
import { CloseIcon } from "../icons";

interface ButtonProps {
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  sx?: any;
}

export function DiscardButton({
  onClick,
  fullWidth = false,
  disabled,
  sx,
}: ButtonProps) {
  return (
    <BaseButton
      onClick={onClick}
      disabled={disabled}
      startIcon={<CloseIcon />}
      bgcolor="#64748b"
      color="#ffffff"
      fontSize="18px"
      fullWidth={fullWidth}
      sx={{
        textTransform: "uppercase",
        "&:hover": {
          bgcolor: "#475569",
        },
        ...sx,
      }}
    >
      DISCARD
    </BaseButton>
  );
}
