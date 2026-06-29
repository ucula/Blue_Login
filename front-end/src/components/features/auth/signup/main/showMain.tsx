import {
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import useSignup from "./useMain";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthTextField from "../../componenents/AuthTextFieldProps/authTextField";
export default function showMain() {
  const {
    hidePass,
    handleClickShowPassword,
    isPending,
    form,
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
              <Typography variant="h5">Sign Up</Typography>
            </Box>
            <Stack>
              <AuthTextField
                error={errForm.username}
                value={form.username ?? ""}
                label="Username"
                onChange={(e) => updateForm("username", e.target.value)}
              />

              <AuthTextField
                error={errForm.name}
                value={form.name ?? ""}
                label="Name"
                onChange={(e) => updateForm("name", e.target.value)}
              />

              <AuthTextField
                error={errForm.email}
                value={form.email ?? ""}
                label="Email"
                onChange={(e) => updateForm("email", e.target.value)}
              />

              <AuthTextField
                label="Street"
                value={form.address?.street ?? ""}
                onChange={(e) => updateAddressField("street", e.target.value)}
              />

              <AuthTextField
                label="Suite"
                value={form.address?.suite ?? ""}
                onChange={(e) => updateAddressField("suite", e.target.value)}
              />

              <AuthTextField
                label="City"
                value={form.address?.city ?? ""}
                onChange={(e) => updateAddressField("city", e.target.value)}
              />

              <AuthTextField
                label="Zipcode"
                value={form.address?.zipcode ?? ""}
                onChange={(e) => updateAddressField("zipcode", e.target.value)}
              />

              <AuthTextField
                label="Phone"
                value={form.phone ?? ""}
                onChange={(e) => updateForm("phone", e.target.value)}
              />

              <AuthTextField
                error={errForm.website}
                label="Website"
                value={form.website ?? ""}
                onChange={(e) => updateForm("website", e.target.value)}
              />

              <AuthTextField
                label="Company"
                value={form.company?.name ?? ""}
                onChange={(e) => updateCompanyField("name", e.target.value)}
              />

              <AuthTextField
                error={errForm.pass}
                label="Password"
                value={form.pass ?? ""}
                onChange={(e) => updateForm("pass", e.target.value)}
                isPass={true}
              />

              <AuthTextField
                error={errForm.pass}
                label="Confirm Password"
                value={form.confirm ?? ""}
                onChange={(e) => updateForm("confirm", e.target.value)}
                isPass={true}
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
