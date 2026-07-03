import { useState } from "react";
import { InputAdornment } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useLogin from "./useLogin";
import { PageContainer } from "../../../common/baseComponents/layout";
import { HeaderLogo } from "../../../common/baseComponents/header";
import { BaseCard } from "../../../common/baseComponents/card";
import { AuthTitle } from "../../../common/baseComponents/typography";
import {
  AuthInput,
  PasswordVisibilityToggle,
} from "../../../common/baseComponents/input";
import {
  ForgotPassword,
  SubmitButton,
} from "../../../common/baseComponents/button";
import { AuthFooter } from "../../../common/baseComponents/footer";

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
        <ForgotPassword onClick={handleForget} label="Forgot password?" />

        {/* Submit Button */}
        <SubmitButton onClick={handleLogin}>Sign in</SubmitButton>
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
