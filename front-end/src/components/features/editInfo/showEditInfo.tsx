import { Box, Grid, Stack, CircularProgress, Typography } from "@mui/material";
import Header from "@/components/common/BaseComponents/Header/Header";
import FormUserBox from "@/components/features/addUser/addUserComponents/AddInput";
import FootButton from "@/components/common/BaseComponents/FootButton/FootButton";
import useEditInfo from "./useEditinfo";

export default function ShowEditInfo() {
  const {
    loading,
    error,
    form,
    updateField,
    updateAddressField,
    updateCompanyField,
    handleSave,
    handleCancel,
  } = useEditInfo();

  const size = 5;
  return loading ? (
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
                error={error.username}
                label="Username: "
                value={form.username}
                onChange={(e) => updateField("username", e.target.value)}
              />
            </Grid>
            <Grid size={size}></Grid>

            {/* Row2 */}
            <Grid size={size}>
              <FormUserBox
                error={error.name}
                label="Name: "
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </Grid>
            <Grid size={size}>
              <FormUserBox
                error={error.email}
                label="Email: "
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </Grid>

            {/* Row3 */}
            <Grid size={size}>
              <FormUserBox
                label="Street: "
                value={form.address?.street || ""}
                onChange={(e) => updateAddressField("street", e.target.value)}
              />
            </Grid>
            <Grid size={size}>
              <FormUserBox
                label="Suite: "
                value={form.address?.suite || ""}
                onChange={(e) => updateAddressField("suite", e.target.value)}
              />
            </Grid>

            {/* Row4 */}
            <Grid size={size}>
              <FormUserBox
                label="City: "
                value={form.address?.city || ""}
                onChange={(e) => updateAddressField("city", e.target.value)}
              />
            </Grid>
            <Grid size={size}>
              <FormUserBox
                label="Zip code: "
                value={form.address?.zipcode || ""}
                onChange={(e) => updateAddressField("zipcode", e.target.value)}
              />
            </Grid>

            {/* Row5 */}
            <Grid size={size}>
              <FormUserBox
                label="Phone: "
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </Grid>
            <Grid size={size}>
              <FormUserBox
                error={error.website}
                label="Website: "
                value={form.website}
                onChange={(e) => updateField("website", e.target.value)}
              />
            </Grid>

            {/* Row6 */}
            <Grid size={size}>
              <FormUserBox
                label="Company: "
                value={form.company?.name || ""}
                onChange={(e) => updateCompanyField("name", e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      </Stack>
      <FootButton label="Save" handlemethod={handleSave} />
    </Box>
  );
}
