import { InputAdornment, Stack } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockResetIcon from "@mui/icons-material/LockReset";
import {
  SaveButton,
  CancelButton,
} from "@/components/common/baseComponents/button";
import usePass from "./useResetPassword";
import {
  PasswordPolicy,
  PasswordVisibilityToggle,
} from "@/components/common/baseComponents/tool";
import { PageContainer } from "@/components/common/baseComponents/layout";
import { BaseCard } from "@/components/common/baseComponents/card";
import { AuthTitle } from "@/components/common/baseComponents/typography";
import { AuthInput } from "@/components/common/baseComponents/input";

export default function ResetPasswordForm() {
  const {
    isPending,
    errForm,
    form,
    setForm,
    handleReset,
    handleCancel,
    showPassword,
    setShowPassword,
  } = usePass();

  return (
    <PageContainer>
      <BaseCard>
        <AuthTitle
          title="Reset Password"
          subtitle="Please set a new secure password."
        />
        <Stack spacing={3}>
          <AuthInput
            fullWidth
            label="New Password"
            placeholder="Min. 8 characters"
            type={showPassword ? "text" : "password"}
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
            label="Confirm New Password"
            placeholder="Repeat password"
            type={showPassword ? "text" : "password"}
            error={!!errForm.pass}
            helperText={errForm.pass}
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
          <PasswordPolicy password={form.pass ?? ""} />
          <SaveButton onClick={handleReset} disabled={isPending} />
          <CancelButton onClick={handleCancel} />
        </Stack>
      </BaseCard>
    </PageContainer>
  );
}
