// import RectangleBox from "@/components/common/BaseComponents/RectBorder/RectangleBox";
import { Box, Stack, Button, TextField } from "@mui/material";
import LoginLogic from "./UseLogin";

export default function ShowLogin() {
  const { handleLogin, handleSignup, updateField } = LoginLogic();
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
            id="filled-basic"
            label="Email"
            variant="standard"
            sx={{ marginBottom: 3 }}
            onChange={(e) => updateField("email", e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="standard"
            sx={{ marginBottom: 7 }}
            onChange={(e) => updateField("pass", e.target.value)}
          />
          <Button sx={{ bgcolor: "#abdcffff" }} onClick={handleSignup}>
            Signup
          </Button>
          <Button
            sx={{ bgcolor: "rgba(255, 158, 133, 1)" }}
            onClick={handleSignup}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
