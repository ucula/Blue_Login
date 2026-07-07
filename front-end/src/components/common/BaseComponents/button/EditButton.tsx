import { BaseButton } from "./BaseButton";
import { EditIcon } from "../icons";

interface ButtonProps {
  onClick?: () => void;
  fullWidth?: boolean;
  sx?: any;
}

export function EditButton({ onClick, fullWidth = false, sx }: ButtonProps) {
  return (
    <BaseButton
      onClick={onClick}
      startIcon={<EditIcon />}
      bgcolor="#2563EB"
      color="#ffffff"
      fontSize="18px"
      fullWidth={fullWidth}
      sx={{
        textTransform: "uppercase",
        "&:hover": {
          bgcolor: "#1D4ED8",
        },
        ...sx,
      }}
    >
      EDIT
    </BaseButton>
  );
}
