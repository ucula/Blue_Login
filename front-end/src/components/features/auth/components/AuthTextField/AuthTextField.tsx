import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Logic from "./useAuthTextField";

interface AuthTextField {
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  isPass?: boolean;
}

export default function AuthTextField({
  error,
  value,
  onChange,
  label,
  isPass = false,
}: AuthTextField) {
  const { hidePass, handleClickShowPassword } = Logic();
  return (
    <TextField
      helperText={error}
      error={!!error}
      label={label}
      variant="standard"
      value={value}
      sx={{ marginBottom: 3 }}
      onChange={onChange}
      type={isPass ? (hidePass ? "password" : "text") : "text"}
      autoComplete={isPass ? "new-password" : "off"}
      slotProps={
        isPass
          ? {
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {hidePass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }
          : undefined
      }
    />
  );
}
