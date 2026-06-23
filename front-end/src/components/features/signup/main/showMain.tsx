import {
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import useSignup from "./useMain";
export default function showMain() {
  const {
    isPending,
    errForm,
    handleCancel,
    updateForm,
    updateAddressField,
    updateCompanyField,
    handleSignup,
  } = useSignup();
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
        {isPending && (
          <Box sx={{ justifyItems: "center" }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Verifying Account...
            </Typography>
            <Typography color="textSecondary">
              Please wait while we verify your email token.
            </Typography>
          </Box>
        )}
        {!isPending && (
          <>
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
              <TextField
                helperText={errForm.username}
                error={!!errForm.username}
                id="filled-basic"
                label="Username"
                variant="standard"
                sx={{ marginBottom: 3 }}
                onChange={(e) => updateForm("username", e.target.value)}
              />

              <TextField
                helperText={errForm.name}
                error={!!errForm.name}
                id="filled-basic"
                label="Name"
                variant="standard"
                sx={{ marginBottom: 3 }}
                onChange={(e) => updateForm("name", e.target.value)}
              />

              <TextField
                helperText={errForm.email}
                error={!!errForm.email}
                id="filled-basic"
                label="Email"
                variant="standard"
                sx={{ marginBottom: 3 }}
                onChange={(e) => updateForm("email", e.target.value)}
              />

              <TextField
                id="filled-basic"
                label="Street"
                variant="standard"
                sx={{ marginBottom: 3 }}
                onChange={(e) => updateForm("street", e.target.value)}
              />

              <TextField
                id="filled-basic"
                label="Suite"
                variant="standard"
                sx={{ marginBottom: 3 }}
                onChange={(e) => updateAddressField("suite", e.target.value)}
              />

              <TextField
                id="filled-basic"
                label="City"
                variant="standard"
                sx={{ marginBottom: 3 }}
                onChange={(e) => updateAddressField("city", e.target.value)}
              />

              <TextField
                id="filled-basic"
                label="Zipcode"
                variant="standard"
                sx={{ marginBottom: 3 }}
                onChange={(e) => updateAddressField("zipcode", e.target.value)}
              />

              <TextField
                id="filled-basic"
                label="Phone"
                variant="standard"
                sx={{ marginBottom: 3 }}
                onChange={(e) => updateForm("phone", e.target.value)}
              />

              <TextField
                id="filled-basic"
                label="Website"
                variant="standard"
                sx={{ marginBottom: 3 }}
                onChange={(e) => updateForm("website", e.target.value)}
              />

              <TextField
                id="filled-basic"
                label="Company"
                variant="standard"
                sx={{ marginBottom: 3 }}
                onChange={(e) => updateCompanyField("name", e.target.value)}
              />

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
