import { BaseButton } from "./BaseButton";
import { SendIcon } from "../icons";

interface ButtonProps {
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  sx?: any;
}

export function SendAgainButton({
  onClick,
  fullWidth = false,
  disabled,
  sx,
}: ButtonProps) {
  return (
    <BaseButton
      onClick={onClick}
      disabled={disabled}
      startIcon={<SendIcon />}
      bgcolor="#2563eb"
      color="#ffffff"
      fontSize="18px"
      fullWidth={fullWidth}
      sx={{
        textTransform: "uppercase",
        "&:hover": {
          bgcolor: "#1d4ed8",
        },
        ...sx,
      }}
    >
      SEND VERIFY LINK
    </BaseButton>
  );
}
