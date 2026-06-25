import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import usePass from "./usePass";
export default function showPass() {
  const { isPending, errForm, updateForm, handleReset, handleCancel } = usePass();
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
        <Box
          sx={{
            textAlign: "center",
            justifyContent: "center",
            marginBottom: 6,
          }}
        >
          <Typography variant="h5">Reset Password</Typography>
        </Box>

        <Stack>
          <TextField
            helperText={errForm.pass}
            error={!!errForm.pass}
            id="filled-basic"
            label="Input your new password"
            variant="standard"
            sx={{ marginBottom: 3 }}
            onChange={(e) => updateForm("pass", e.target.value)}
          />
          <TextField
            helperText={errForm.pass}
            error={!!errForm.pass}
            id="filled-basic"
            label="Input your new password again"
            variant="standard"
            sx={{ marginBottom: 3 }}
            onChange={(e) => updateForm("confirm", e.target.value)}
          />
          <Button
            sx={{ bgcolor: "rgba(255, 158, 133, 1)" }}
            onClick={handleReset}
            disabled={isPending}
          >
            {isPending ? "Resetting..." : "Reset"}
          </Button>
          <Button sx={{ bgcolor: "#abdcffff" }} onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
