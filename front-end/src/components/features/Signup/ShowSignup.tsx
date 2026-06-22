import { Box, Stack, Button, TextField, Typography } from "@mui/material";
import useSignup from "./useSignup";
export default function ShowSignup() {
  const { errForm, handleCancel, updateForm, handleSignup } = useSignup();
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
          <TextField
            helperText={errForm.username}
            error={!!errForm.username}
            id="filled-basic"
            label="Username"
            variant="standard"
            sx={{ marginBottom: 3 }}
            onChange={(e) => updateForm("email", e.target.value)}
          />

          <TextField
            helperText={errForm.name}
            error={!!errForm.name}
            id="filled-basic"
            label="Name"
            variant="standard"
            sx={{ marginBottom: 3 }}
            onChange={(e) => updateForm("pass", e.target.value)}
          />

          <TextField
            helperText={errForm.email}
            error={!!errForm.email}
            id="filled-basic"
            label="Email"
            variant="standard"
            sx={{ marginBottom: 3 }}
            onChange={(e) => updateForm("pass", e.target.value)}
          />

          <TextField
            id="filled-basic"
            label="Street"
            variant="standard"
            sx={{ marginBottom: 3 }}
            onChange={(e) => updateForm("pass", e.target.value)}
          />

          <TextField
            id="filled-basic"
            label="Suite"
            variant="standard"
            sx={{ marginBottom: 3 }}
            onChange={(e) => updateForm("pass", e.target.value)}
          />

          <TextField
            id="filled-basic"
            label="City"
            variant="standard"
            sx={{ marginBottom: 3 }}
            onChange={(e) => updateForm("pass", e.target.value)}
          />

          <TextField
            id="filled-basic"
            label="Zipcode"
            variant="standard"
            sx={{ marginBottom: 3 }}
            onChange={(e) => updateForm("pass", e.target.value)}
          />

          <TextField
            id="filled-basic"
            label="Phone"
            variant="standard"
            sx={{ marginBottom: 3 }}
            onChange={(e) => updateForm("pass", e.target.value)}
          />

          <TextField
            id="filled-basic"
            label="Website"
            variant="standard"
            sx={{ marginBottom: 3 }}
            onChange={(e) => updateForm("pass", e.target.value)}
          />

          <TextField
            id="filled-basic"
            label="Company"
            variant="standard"
            sx={{ marginBottom: 3 }}
            onChange={(e) => updateForm("pass", e.target.value)}
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
      </Box>
    </Box>
  );
}
