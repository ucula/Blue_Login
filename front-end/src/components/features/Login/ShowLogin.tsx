import { Box, Stack, Button, TextField } from "@mui/material";
import LoginLogic from "./UseLogin";

export default function ShowLogin() {
  const { errForm, handleLogin, handleSignup, updateForm } = LoginLogic();
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
          <TextField
            helperText={errForm.pass}
            error={!!errForm.pass}
            id="outlined-basic"
            label="Password"
            variant="standard"
            sx={{ marginBottom: 7 }}
            onChange={(e) => updateForm("pass", e.target.value)}
          />
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
