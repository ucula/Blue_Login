import { Box, Typography, Button, Divider } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export default function Header({
  label,
  handlenavigate,
}: {
  label: String;
  handlenavigate: () => void;
}) {
  return (
    <Box
      sx={{
        textAlign: "center",
        justifyContent: "center",
        marginBottom: 6,
      }}
    >
      <Button
        sx={{
          color: "black",
          backgroundColor: "transparent",
          left: 150,
          position: "absolute",
          ":hover": {
            color: "gray",
          },
          cursor: "pointer",
        }}
        onClick={handlenavigate}
      >
        <NavigateBeforeIcon />
        Back
      </Button>
      <Typography variant="h5">{label}</Typography>
      <Divider sx={{ marginTop: 6, marginBottom: 6 }} />
    </Box>
  );
}
