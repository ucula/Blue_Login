import { Box, Button } from "@mui/material";

export default function footButton({
  color = "primary",
  top = 9,
  label,
  handlemethod,
}: {
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit";
  top?: number;
  label: string;
  handlemethod: () => void;
}) {
  return (
    <Box sx={{ marginTop: top, textAlign: "center" }}>
      <Button
        sx={{ width: "80%" }}
        color={color}
        variant="contained"
        onClick={handlemethod}
      >
        {label}
      </Button>
    </Box>
  );
}
