import { BaseButton } from "./BaseButton";
import { DeleteIcon } from "../icons";

interface ButtonProps {
  onClick?: () => void;
  fullWidth?: boolean;
  sx?: any;
}

export function DeleteButton({ onClick, fullWidth = false, sx }: ButtonProps) {
  return (
    <BaseButton
      onClick={onClick}
      startIcon={<DeleteIcon />}
      bgcolor="#DC2626"
      color="#ffffff"
      fontSize="18px"
      fullWidth={fullWidth}
      sx={{
        textTransform: "uppercase",
        "&:hover": {
          bgcolor: "#B91C1C",
        },
        ...sx,
      }}
    >
      DELETE
    </BaseButton>
  );
}
