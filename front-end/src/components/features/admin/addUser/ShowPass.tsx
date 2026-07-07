import { useState, useEffect } from "react";
import { Stack, TextField } from "@mui/material";
import { SaveButton, CancelButton } from "@/components/common/baseComponents/button";
import usePass from "./usePass";
import {
  PasswordGauge,
  PasswordVisibilityToggle,
} from "@/components/common/baseComponents/tool";
import { checkPasswordStrength } from "@/utility/password/checkStrength";
import { PageContainer } from "@/components/common/baseComponents/layout";
import { BaseCard } from "@/components/common/baseComponents/card";
import { AuthTitle } from "@/components/common/baseComponents/typography";

export default function showPass() {
  const { isPending, errForm, form, setForm, handleReset, handleCancel } =
    usePass();

  const [strength, setStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setStrength(checkPasswordStrength(form.pass || ""));
  }, [form.pass]);

  return (
    <PageContainer>
      <BaseCard>
        <AuthTitle
          title="Input your password"
          subtitle="Please set a secure password for the user."
        />
        <Stack spacing={3}>
          <TextField
            helperText={errForm.pass}
            error={!!errForm.pass}
            id="filled-basic"
            label="Input your password"
            variant="standard"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setForm({ ...form, pass: e.target.value })}
            slotProps={{
              input: {
                endAdornment: (
                  <PasswordVisibilityToggle
                    show={showPassword}
                    onToggle={() => setShowPassword(!showPassword)}
                  />
                ),
              },
            }}
          />
          {(form.pass || "").length >= 8 && (
            <PasswordGauge strength={strength} />
          )}
          <TextField
            helperText={errForm.pass}
            error={!!errForm.pass}
            id="filled-basic-confirm"
            label="Input your password again"
            variant="standard"
            type={showConfirmPassword ? "text" : "password"}
            onChange={(e) => setForm({ ...form, confirmPass: e.target.value })}
            slotProps={{
              input: {
                endAdornment: (
                  <PasswordVisibilityToggle
                    show={showConfirmPassword}
                    onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                ),
              },
            }}
          />
          <SaveButton
            onClick={handleReset}
            disabled={isPending}
          />
          <CancelButton onClick={handleCancel} />
        </Stack>
      </BaseCard>
    </PageContainer>
  );
}
