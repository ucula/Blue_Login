import { Box, Stack, Typography, TextField } from "@mui/material";
import { useId } from "react";

export default function FormUserBox({
  label,
  error,
  value,
  onChange,
}: {
  label: string;
  error?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const uniqueId = useId();
  const sx = {
    "& .MuiInputBase-input": {
      padding: "8px 10px",
      fontSize: "21px",
    },
  };
  return (
    <Box>
      <Stack>
        <Typography sx={{ color: "black" }}>{label}</Typography>
        <TextField
          value={value || ""}
          onChange={onChange}
          sx={sx}
          error={!!error}
          id={uniqueId}
          size="small"
          variant="outlined"
          helperText={error}
        />
      </Stack>
    </Box>
  );
}
