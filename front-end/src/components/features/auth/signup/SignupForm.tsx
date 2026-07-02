import { Stack, Button } from "@mui/material";
import useSignup from "./useSignup";
import AuthTextField from "../components/AuthTextField/AuthTextField";
import SendingTemp from "@/components/common/skeleton/sendingTemp";
import MainTemp from "@/components/common/baseComponents/mainTemp";

export default function showMain() {
  const { isPending, form, errForm, handleCancel, setForm, handleSignup } =
    useSignup();

  return isPending ? (
    <SendingTemp />
  ) : (
    <MainTemp
      header="Signup"
      content={
        <Stack>
          <AuthTextField
            error={errForm.username}
            value={form.username ?? ""}
            label="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <AuthTextField
            error={errForm.name}
            value={form.name ?? ""}
            label="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <AuthTextField
            error={errForm.email}
            value={form.email ?? ""}
            label="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <AuthTextField
            label="Street"
            value={form.address?.street ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                address: { ...form.address, street: e.target.value },
              })
            }
          />

          <AuthTextField
            label="Suite"
            value={form.address?.suite ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                address: { ...form.address, suite: e.target.value },
              })
            }
          />

          <AuthTextField
            label="City"
            value={form.address?.city ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                address: { ...form.address, city: e.target.value },
              })
            }
          />

          <AuthTextField
            label="Zipcode"
            value={form.address?.zipcode ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                address: { ...form.address, zipcode: e.target.value },
              })
            }
          />

          <AuthTextField
            label="Phone"
            value={form.phone ?? ""}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <AuthTextField
            error={errForm.website}
            label="Website"
            value={form.website ?? ""}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />

          <AuthTextField
            label="Company"
            value={form.company?.name ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                company: { ...form.company, name: e.target.value },
              })
            }
          />

          <AuthTextField
            error={errForm.pass}
            label="Password"
            value={form.pass ?? ""}
            onChange={(e) => setForm({ ...form, pass: e.target.value })}
            isPass={true}
          />

          <AuthTextField
            error={errForm.pass}
            label="Confirm Password"
            value={form.confirmPass ?? ""}
            onChange={(e) => setForm({ ...form, confirmPass: e.target.value })}
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
      }
    />
  );
}
