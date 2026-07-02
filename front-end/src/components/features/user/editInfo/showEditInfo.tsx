import { Box, Grid, Stack, CircularProgress, Typography } from "@mui/material";
import Header from "@/components/common/baseComponents/header/header";
import FormUserBox from "@/components/features/user/components/FormBox";
import FootButton from "@/components/common/baseComponents/footButton/footButton";
import useEditInfo from "./useEditInfo";

export default function showEditInfo() {
  const { isLoading, errForm, form, setForm, handleSave, handleCancel } =
    useEditInfo();

  const size = 5;
  return isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography>Loading User Details...</Typography>
    </Box>
  ) : (
    <Box>
      <Header label="Edit User" handlenavigate={handleCancel} />
      <Stack spacing={9}>
        <Box>
          <Grid
            container
            rowSpacing={4}
            sx={{
              justifySelf: "center",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            {/* Row1 */}
            <Grid size={size}>
              <FormUserBox
                error={errForm.username}
                label="Username: "
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </Grid>
            <Grid size={size}></Grid>

            {/* Row2 */}
            <Grid size={size}>
              <FormUserBox
                error={errForm.name}
                label="Name: "
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Grid>
            <Grid size={size}>
              <FormUserBox
                error={errForm.email}
                label="Email: "
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Grid>

            {/* Row3 */}
            <Grid size={size}>
              <FormUserBox
                label="Street: "
                value={form.address?.street || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: { ...form.address, street: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid size={size}>
              <FormUserBox
                label="Suite: "
                value={form.address?.suite || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: { ...form.address, suite: e.target.value },
                  })
                }
              />
            </Grid>

            {/* Row4 */}
            <Grid size={size}>
              <FormUserBox
                label="City: "
                value={form.address?.city || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: { ...form.address, city: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid size={size}>
              <FormUserBox
                label="Zip code: "
                value={form.address?.zipcode || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: { ...form.address, zipcode: e.target.value },
                  })
                }
              />
            </Grid>

            {/* Row5 */}
            <Grid size={size}>
              <FormUserBox
                label="Phone: "
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </Grid>
            <Grid size={size}>
              <FormUserBox
                error={errForm.website}
                label="Website: "
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
              />
            </Grid>

            {/* Row6 */}
            <Grid size={size}>
              <FormUserBox
                label="Company: "
                value={form.company?.name || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    company: { ...form.company, name: e.target.value },
                  })
                }
              />
            </Grid>
          </Grid>
        </Box>
      </Stack>
      <FootButton label="Save" handlemethod={handleSave} />
    </Box>
  );
}
