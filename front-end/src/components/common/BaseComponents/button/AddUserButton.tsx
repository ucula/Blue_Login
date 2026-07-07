import { BaseButton } from "./BaseButton";
import { AddIcon } from "../icons";

interface ButtonProps {
  onClick?: () => void;
  fullWidth?: boolean;
  sx?: any;
}

export function AddUserButton({ onClick, fullWidth = false, sx }: ButtonProps) {
  return (
    <BaseButton
      onClick={onClick}
      startIcon={<AddIcon />}
      fontSize="20px"
      fullWidth={fullWidth}
      sx={sx}
    >
      ADD
    </BaseButton>
  );
}
