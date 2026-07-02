import { Button, Stack, TextField } from "@mui/material";
import usePass from "./useResetPassword";
import MainTemp from "@/components/common/baseComponents/mainTemp";
export default function showPass() {
  const { isPending, errForm, form, setForm, handleReset, handleCancel } =
    usePass();
  return (
    <MainTemp
      header="Reset Password"
      content={
        <Stack>
          <TextField
            helperText={errForm.pass}
            error={!!errForm.pass}
            id="filled-basic"
            label="Input your new password"
            variant="standard"
            sx={{ marginBottom: 3 }}
            onChange={(e) => setForm({ ...form, pass: e.target.value })}
          />
          <TextField
            helperText={errForm.pass}
            error={!!errForm.pass}
            id="filled-basic"
            label="Input your new password again"
            variant="standard"
            sx={{ marginBottom: 3 }}
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
      }
    />
  );
}
