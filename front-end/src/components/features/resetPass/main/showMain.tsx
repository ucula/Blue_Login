import {
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import useMain from "./useMain";
export default function showMain() {
  const { form, isPending, errForm, handleCancel, updateForm, handleNext } =
    useMain();
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
        {isPending ? (
          <Box sx={{ justifyItems: "center" }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Sending Email
            </Typography>
            <Typography color="textSecondary">
              Please wait while we are sending your link.
            </Typography>
          </Box>
        ) : (
          <>
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
                helperText={errForm.email}
                error={!!errForm.email}
                id="filled-basic"
                label="Input your email"
                variant="standard"
                sx={{ marginBottom: 3 }}
                value={form.email ?? ""}
                onChange={(e) => updateForm("email", e.target.value)}
              />
              <Button
                sx={{ bgcolor: "rgba(255, 158, 133, 1)" }}
                onClick={handleNext}
              >
                Next
              </Button>
              <Button sx={{ bgcolor: "#abdcffff" }} onClick={handleCancel}>
                Cancel
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Box>
  );
}
