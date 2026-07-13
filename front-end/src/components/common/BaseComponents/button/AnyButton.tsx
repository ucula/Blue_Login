import { BaseButton } from "./BaseButton";
import { type ReactNode } from "react";

interface AnyButtonProps {
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  sx?: any;
  color: string;
  bgcolor: string;
  children: ReactNode;
}

export function AnyButton({
  onClick,
  fullWidth = false,
  disabled = false,
  sx,
  color,
  bgcolor,
  children,
}: AnyButtonProps) {
  return (
    <BaseButton
      onClick={onClick}
      disabled={disabled}
      bgcolor={bgcolor}
      color={color}
      fontSize="18px"
      fullWidth={fullWidth}
      sx={{
        py: 1.5,
        borderRadius: "8px",
        ...sx,
      }}
    >
      {children}
    </BaseButton>
  );
}
