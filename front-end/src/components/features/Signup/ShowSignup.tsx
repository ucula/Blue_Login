import { Box, Stack, Button, TextField } from "@mui/material";
import UseSignup from "./UseSignup";

export default function ShowSignup() {
  const { insPass, errForm, handleCancel, updateForm, handleEmail } =
    UseSignup();
  return (
    <Box
      sx={{ alignContent: "center", justifyItems: "center", height: "700px" }}
    >
      <Box
        sx={{
          padding: "80px 90px",
          bgcolor: "white",
          width: "30%",
        }}
      >
        <Stack>
          <TextField
            helperText={errForm.email}
            error={!!errForm.email}
            id="filled-basic"
            label="Email"
            variant="standard"
            sx={{ marginBottom: 3 }}
            onChange={(e) => updateForm("email", e.target.value)}
          />
          <Button
            sx={{ bgcolor: "rgba(255, 158, 133, 1)" }}
            onClick={handleEmail}
          >
            Next
          </Button>
          <Button sx={{ bgcolor: "#abdcffff" }} onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
