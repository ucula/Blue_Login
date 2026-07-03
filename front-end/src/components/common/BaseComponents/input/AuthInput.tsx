import { Box, Typography, TextField, type TextFieldProps } from "@mui/material";

type AuthInputProps = TextFieldProps & {
  label: string;
  containerSx?: any;
};

export function AuthInput({ label, containerSx, ...props }: AuthInputProps) {
  return (
    <Box sx={containerSx}>
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 600, mb: 1, color: "#212529" }}
      >
        {label}
      </Typography>
      <TextField
        {...props}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            "& fieldset": { borderColor: "#dee2e6" },
          },
          ...props.sx,
        }}
      />
    </Box>
  );
}
