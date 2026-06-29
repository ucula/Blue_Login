import { Box, Grid, Stack } from "@mui/material";
import Header from "@/components/common/baseComponents/header/header";
import FormUserBox from "./components/formBox";
import FootButton from "@/components/common/baseComponents/footButton/footButton";
import useAddUser from "./useAddUser";

export default function showAddUser() {
  const {
    error,
    form,
    updateForm,
    updateAddressField,
    updateCompanyField,
    handleSave,
    handleHome,
  } = useAddUser();

  const size = 5;

  return (
    <Box>
      <Header label="Add User" handlenavigate={handleHome} />
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
                onChange={(e) => updateForm("username", e.target.value)}
              />
            </Grid>
            <Grid size={size}></Grid>
            {/* Row2 */}
            <Grid size={size}>
              <FormUserBox
                error={error.name}
                label="Name: "
                value={form.name}
                onChange={(e) => updateForm("name", e.target.value)}
              />
            </Grid>
            <Grid size={size}>
              <FormUserBox
                error={error.email}
                label="Email: "
                value={form.email}
                onChange={(e) => updateForm("email", e.target.value)}
              />
            </Grid>

            {/* row4 */}
            <Grid size={size}>
              <FormUserBox
                label="Street: "
                value={form.address?.street}
                onChange={(e) => updateAddressField("street", e.target.value)}
              />
            </Grid>
            <Grid size={size}>
              <FormUserBox
                label="Suite: "
                value={form.address?.suite}
                onChange={(e) => updateAddressField("suite", e.target.value)}
              />
            </Grid>

            {/* row5 */}
            <Grid size={size}>
              <FormUserBox
                label="City: "
                value={form.address?.city}
                onChange={(e) => updateAddressField("city", e.target.value)}
              />
            </Grid>
            <Grid size={size}>
              <FormUserBox
                label="Zip code: "
                value={form.address?.zipcode}
                onChange={(e) => updateAddressField("zipcode", e.target.value)}
              />
            </Grid>

            {/* row6 */}
            <Grid size={size}>
              <FormUserBox
                label="Phone: "
                value={form.phone}
                onChange={(e) => updateForm("phone", e.target.value)}
              />
            </Grid>
            <Grid size={size}>
              <FormUserBox
                error={error.website}
                label="Website: "
                value={form.website}
                onChange={(e) => updateForm("website", e.target.value)}
              />
            </Grid>

            {/* row7*/}
            <Grid size={size}>
              <FormUserBox
                label="Company: "
                value={form.company?.name}
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
