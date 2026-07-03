import { useState } from "react";
import { InputAdornment } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useLogin from "./useLogin";
import { PageContainer } from "@/components/common/baseComponents/layout";
import { HeaderLogo } from "@/components/common/baseComponents/header";
import { BaseCard } from "@/components/common/baseComponents/card";
import { AuthTitle } from "@/components/common/baseComponents/typography";
import { Box } from "@mui/material";
import { AuthInput } from "@/components/common/baseComponents/input";
import { PasswordVisibilityToggle } from "@/components/common/baseComponents/tool";
import { BaseButton } from "@/components/common/baseComponents/button";
import { AuthFooter } from "@/components/common/baseComponents/footer";

export default function showLogin() {
  const { form, errForm, handleLogin, handleSignup, handleForget, setForm } =
    useLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <PageContainer>
      {/* Header Logo */}
      <HeaderLogo title="ExpertAdmin" />

      {/* Login Card */}
      <BaseCard>
        {/* Titles */}
        <AuthTitle
          title="Login"
          subtitle="Log in with your administrator account."
        />

        {/* Email / Username field */}
        <AuthInput
          fullWidth
          label="Email"
          placeholder="name@company.com"
          error={!!errForm.email}
          helperText={errForm.email}
          value={form.email ?? ""}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon sx={{ color: "#adb5bd" }} />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Password field */}
        <AuthInput
          fullWidth
          label="Password"
          containerSx={{ mt: "20px" }}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          error={!!errForm.pass}
          helperText={errForm.pass}
          value={form.pass ?? ""}
          onChange={(e) => setForm({ ...form, pass: e.target.value })}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ color: "#adb5bd" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <PasswordVisibilityToggle
                  show={showPassword}
                  onToggle={() => setShowPassword(!showPassword)}
                />
              ),
            },
          }}
        />

        {/* Forgot Password Link */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1.5 }}>
          <BaseButton variant="text" onClick={handleForget}>
            Forgot password?
          </BaseButton>
        </Box>

        {/* Submit Button */}
        <BaseButton
          fullWidth
          onClick={handleLogin}
          fontSize="26px"
          weight={600}
          sx={{ borderRadius: "12px", py: "12px" }}
        >
          Sign in
        </BaseButton>
      </BaseCard>

      {/* Footer Registration Link */}
      <AuthFooter
        text="Don't have an account yet?"
        linkText="Create an account!"
        onClick={handleSignup}
      />
    </PageContainer>
  );
}
