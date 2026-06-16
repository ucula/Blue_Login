import { Box, Stack, Button, TextField, Typography } from "@mui/material";
import UseReset from "./UseReset";
export default function ShowReset() {
  const {
    insPass,
    errForm,
    handleBack,
    handleCancel,
    updateForm,
    handleNext,
    handleSignup,
  } = UseReset();
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
          <Typography variant="h5">Sign Up</Typography>
        </Box>
        <Stack>
          {!insPass && (
            <>
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
                onClick={handleNext}
              >
                Next
              </Button>
              <Button sx={{ bgcolor: "#abdcffff" }} onClick={handleCancel}>
                Cancel
              </Button>
            </>
          )}

          {insPass && (
            <>
              <TextField
                helperText={errForm.pass}
                error={!!errForm.pass}
                id="filled-basic"
                label="Password"
                variant="standard"
                sx={{ marginBottom: 3 }}
                onChange={(e) => updateForm("pass", e.target.value)}
              />
              <Button
                sx={{ bgcolor: "rgba(255, 158, 133, 1)" }}
                onClick={handleSignup}
              >
                Signup
              </Button>
              <Button sx={{ bgcolor: "#abdcffff" }} onClick={handleBack}>
                Back
              </Button>
            </>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
