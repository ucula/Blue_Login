import { IconButton, InputAdornment } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

interface PasswordVisibilityToggleProps {
  show: boolean;
  onToggle: () => void;
}

export function PasswordVisibilityToggle({
  show,
  onToggle,
}: PasswordVisibilityToggleProps) {
  return (
    <InputAdornment position="end">
      <IconButton onClick={onToggle} edge="end">
        {show ? (
          <VisibilityOutlinedIcon sx={{ color: "#6c757d" }} />
        ) : (
          <VisibilityOffOutlinedIcon sx={{ color: "#6c757d" }} />
        )}
      </IconButton>
    </InputAdornment>
  );
}
