import { Box, Stack, Button, TextField, Typography, Link } from "@mui/material";
import useLogin from "./useLogin";

export default function showLogin() {
  const { errForm, handleLogin, handleSignup, handleforgot, updateForm } =
    useLogin();
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
          <Typography variant="h5">Log In</Typography>
        </Box>
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
          <TextField
            helperText={errForm.pass}
            error={!!errForm.pass}
            id="outlined-basic"
            label="Password"
            variant="standard"
            onChange={(e) => updateForm("pass", e.target.value)}
          />

          <Link
            component="button"
            underline="hover"
            sx={{ marginBottom: 5 }}
            onClick={handleforgot}
          >
            <Typography sx={{ justifySelf: "end", fontSize: "20px" }}>
              Forgot password?
            </Typography>
          </Link>
          <Button
            sx={{ bgcolor: "rgba(255, 158, 133, 1)" }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button sx={{ bgcolor: "#abdcffff" }} onClick={handleSignup}>
            Signup
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
