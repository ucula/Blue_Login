import { Stack, Button, TextField } from "@mui/material";
import SendingTemp from "@/components/common/skeleton/sendingTemp";
import MainTemp from "@/components/common/baseComponents/mainTemp";
import useMain from "./useResetEmail";

export default function showMain() {
  const { form, errForm, isPending, handleCancel, setForm, handleNext } =
    useMain();
  return isPending ? (
    <SendingTemp />
  ) : (
    <MainTemp
      header="Reset Password"
      content={
        <Stack>
          <TextField
            error={!!errForm.email}
            helperText={errForm.email}
            id="filled-basic"
            label="Input your email"
            variant="standard"
            sx={{ marginBottom: 3 }}
            value={form.email ?? ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Button
            sx={{ bgcolor: "rgba(255, 158, 133, 1)" }}
            onClick={handleNext}
          >
            Next
          </Button>
          <Button sx={{ bgcolor: "#abdcffff" }} onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      }
    />
  );
}
