import { TextField } from "@mui/material";

interface EditInfoBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  size?: "small" | "medium";
}

export function EditInfoBox({
  value,
  onChange,
  placeholder,
  error,
  helperText,
  fullWidth = true,
  size = "small",
}: EditInfoBoxProps) {
  return (
    <TextField
      size={size}
      fullWidth={fullWidth}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
    />
  );
}
