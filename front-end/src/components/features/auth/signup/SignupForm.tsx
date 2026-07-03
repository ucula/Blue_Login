import { useState, useEffect } from "react";
import { Box, InputAdornment } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockResetIcon from "@mui/icons-material/LockReset";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import useSignup from "./useSignup";
import SendingTemp from "@/components/common/skeleton/sendingTemp";
import PasswordGauge from "@/components/common/baseComponents/passwordGauge/PasswordGauge";
import { checkPasswordStrength } from "@/utility/password/checkStrength";
import { PageContainer } from "@/components/common/baseComponents/layout";
import { BaseCard } from "@/components/common/baseComponents/card";
import { AuthTitle } from "@/components/common/baseComponents/typography";
import { AuthInput } from "@/components/common/baseComponents/input";
import { PasswordVisibilityToggle } from "@/components/common/baseComponents/tool";
import { BaseButton } from "@/components/common/baseComponents/button";
import { AuthFooter } from "@/components/common/baseComponents/footer";

export default function SignupForm() {
  const { isPending, form, errForm, handleCancel, setForm, handleSignup } =
    useSignup();

  const [strength, setStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setStrength(checkPasswordStrength(form.pass || ""));
  }, [form.pass]);

  return isPending ? (
    <SendingTemp />
  ) : (
    <PageContainer>
      {/* Signup Card */}
      <BaseCard>
        {/* Title */}
        <AuthTitle
          title="Create Account"
          subtitle="Join our platform to start managing your resources."
        />

        {/* Full Name field */}
        <AuthInput
          fullWidth
          label="Name"
          placeholder="John Doe"
          error={!!errForm.name}
          helperText={errForm.name}
          value={form.name ?? ""}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon sx={{ color: "#adb5bd" }} />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Username field */}
        <AuthInput
          fullWidth
          label="Username"
          placeholder="johndoe_admin"
          error={!!errForm.username}
          helperText={errForm.username}
          value={form.username ?? ""}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleOutlinedIcon sx={{ color: "#adb5bd" }} />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Email Address field */}
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

        {/* Side-by-side Password fields */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          <AuthInput
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Password"
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

          <AuthInput
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Confirm Password"
            placeholder="••••••••"
            error={!!errForm.confirmPass}
            helperText={errForm.confirmPass}
            value={form.confirmPass ?? ""}
            onChange={(e) => setForm({ ...form, confirmPass: e.target.value })}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockResetIcon sx={{ color: "#adb5bd" }} />
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
        </Box>

        {/* Password Strength Gauge */}
        <Box>
          {(form.pass || "").length >= 8 && (
            <PasswordGauge strength={strength} />
          )}
        </Box>

        {/* Submit Button */}
        <BaseButton
          fullWidth
          onClick={handleSignup}
          endIcon={<ArrowForwardIcon />}
          fontSize="26px"
          weight={600}
          sx={{ borderRadius: "12px", py: "12px" }}
        >
          Create Account
        </BaseButton>
      </BaseCard>

      {/* Footer Sign in Link */}
      <AuthFooter
        text="Already have an account?"
        linkText="Sign in"
        onClick={handleCancel}
      />
    </PageContainer>
  );
}
