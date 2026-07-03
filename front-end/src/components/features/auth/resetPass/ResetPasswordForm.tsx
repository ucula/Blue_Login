import { useState, useEffect } from "react";
import { Button, Stack, TextField } from "@mui/material";
import usePass from "./useResetPassword";
import PasswordGauge from "@/components/common/baseComponents/passwordGauge/PasswordGauge";
import { checkPasswordStrength } from "@/utility/password/checkStrength";
import { PageContainer } from "@/components/common/baseComponents/layout";
import { BaseCard } from "@/components/common/baseComponents/card";
import { AuthTitle } from "@/components/common/baseComponents/typography";

export default function ResetPasswordForm() {
  const { isPending, errForm, form, setForm, handleReset, handleCancel } =
    usePass();

  const [strength, setStrength] = useState(0);

  useEffect(() => {
    setStrength(checkPasswordStrength(form.pass || ""));
  }, [form.pass]);

  return (
    <PageContainer>
      <BaseCard>
        <AuthTitle
          title="Reset Password"
          subtitle="Please set a new secure password."
        />
        <Stack spacing={3}>
          <TextField
            helperText={errForm.pass}
            error={!!errForm.pass}
            id="filled-basic"
            label="Input your new password"
            variant="standard"
            onChange={(e) => setForm({ ...form, pass: e.target.value })}
          />
          <PasswordGauge strength={strength} />
          <TextField
            helperText={errForm.pass}
            error={!!errForm.pass}
            id="filled-basic-confirm"
            label="Input your new password again"
            variant="standard"
            onChange={(e) => setForm({ ...form, confirmPass: e.target.value })}
          />
          <Button
            sx={{ bgcolor: "rgba(255, 158, 133, 1)" }}
            onClick={handleReset}
            disabled={isPending}
          >
            {isPending ? "Resetting..." : "Reset"}
          </Button>
          <Button sx={{ bgcolor: "#abdcffff" }} onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      </BaseCard>
    </PageContainer>
  );
}

