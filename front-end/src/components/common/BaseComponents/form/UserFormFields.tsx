import { Grid, Stack } from "@mui/material";
import {
  PersonOutlineIcon,
  EmailOutlinedIcon,
  FaceOutlinedIcon,
  HomeOutlinedIcon,
  LocalPhoneOutlinedIcon,
  LanguageOutlinedIcon,
  BusinessOutlinedIcon,
} from "@/components/common/baseComponents/icons";
import {
  InfoBlock,
  EditInfoBox,
} from "@/components/common/baseComponents/input";

interface UserFormFieldsProps {
  form: any;
  setForm: any;
  errForm: any;
}

export function UserFormFields({
  form,
  setForm,
  errForm,
}: UserFormFieldsProps) {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {/* Username Field */}
      <Grid size={6}>
        <InfoBlock
          icon={<PersonOutlineIcon />}
          label="Username"
          value={
            <EditInfoBox
              value={form.username || ""}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="Username"
              error={!!errForm.username}
              helperText={errForm.username}
            />
          }
        />
      </Grid>
      
      {/* Email Field */}
      <Grid size={6}>
        <InfoBlock
          icon={<EmailOutlinedIcon />}
          label="Email"
          value={
            <EditInfoBox
              value={form.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              error={!!errForm.email}
              helperText={errForm.email}
            />
          }
        />
      </Grid>

      {/* Full Name Field */}
      <Grid size={6}>
        <InfoBlock
          icon={<FaceOutlinedIcon />}
          label="Name"
          value={
            <EditInfoBox
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              error={!!errForm.name}
              helperText={errForm.name}
            />
          }
        />
      </Grid>

      {/* Address Fields (Street, Suite, City, Zip Code) */}
      <Grid size={6}>
        <InfoBlock
          icon={<HomeOutlinedIcon />}
          label="Address"
          value={
            <Stack spacing={1} sx={{ width: "100%", mt: 0.5 }}>
              <EditInfoBox
                placeholder="Street"
                value={form.address?.street || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: {
                      ...form.address,
                      street: e.target.value,
                    } as any,
                  })
                }
              />
              <EditInfoBox
                placeholder="Suite"
                value={form.address?.suite || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: {
                      ...form.address,
                      suite: e.target.value,
                    } as any,
                  })
                }
              />
              <EditInfoBox
                placeholder="City"
                value={form.address?.city || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: {
                      ...form.address,
                      city: e.target.value,
                    } as any,
                  })
                }
              />
              <EditInfoBox
                placeholder="Zip Code"
                value={form.address?.zipcode || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: {
                      ...form.address,
                      zipcode: e.target.value,
                    } as any,
                  })
                }
              />
            </Stack>
          }
        />
      </Grid>

      {/* Phone Number Field */}
      <Grid size={6}>
        <InfoBlock
          icon={<LocalPhoneOutlinedIcon />}
          label="Phone"
          value={
            <EditInfoBox
              value={form.phone || ""}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone"
            />
          }
        />
      </Grid>

      {/* Website URL Field */}
      <Grid size={6}>
        <InfoBlock
          icon={<LanguageOutlinedIcon />}
          label="Website"
          value={
            <EditInfoBox
              value={form.website || ""}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              placeholder="Website"
              error={!!errForm.website}
              helperText={errForm.website}
            />
          }
        />
      </Grid>

      {/* Company Name Field */}
      <Grid size={6}>
        <InfoBlock
          icon={<BusinessOutlinedIcon />}
          label="Company"
          value={
            <EditInfoBox
              value={form.company?.name || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  company: {
                    ...form.company,
                    name: e.target.value,
                  } as any,
                })
              }
              placeholder="Company"
            />
          }
        />
      </Grid>
    </Grid>
  );
}
