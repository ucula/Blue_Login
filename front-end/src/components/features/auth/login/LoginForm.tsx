import { Stack, Button, TextField, Typography, Link } from "@mui/material";
import MainTemp from "@/components/common/baseComponents/mainTemp";
import useLogin from "./useLogin";

export default function showLogin() {
  const { form, errForm, handleLogin, handleSignup, handleForget, setForm } =
    useLogin();
  return (
    <MainTemp
      header="Login"
      content={
        <Stack>
          <TextField
            helperText={errForm.email}
            error={!!errForm.email}
            id="filled-basic"
            label="Email"
            variant="standard"
            sx={{ marginBottom: 3 }}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            helperText={errForm.pass}
            error={!!errForm.pass}
            id="outlined-basic"
            label="Password"
            variant="standard"
            onChange={(e) => setForm({ ...form, pass: e.target.value })}
          />

          <Link
            component="button"
            underline="hover"
            sx={{ marginBottom: 5 }}
            onClick={handleForget}
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
      }
    />
  );
}
