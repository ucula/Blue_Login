import { Box, Grid, Stack } from "@mui/material";
import Header from "@/components/common/BaseComponents/Header/Header";
import FormUserLogic from "./UseAddUser";
import FormUserBox from "./FormUserComponents/AddInput";
import FootButton from "@/components/common/BaseComponents/FootButton/FootButton";

export default function FormUser() {
  const {
    error,
    newUser,
    updateField,
    updateAddressField,
    updateCompanyField,
    handleSave,
    handleHome,
  } = FormUserLogic();

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
                value={newUser.username}
                onChange={(e) => updateField("username", e.target.value)}
              />
            </Grid>
            <Grid size={size}></Grid>

            {/* Row2 */}
            <Grid size={size}>
              <FormUserBox
                error={error.name}
                label="Name: "
                value={newUser.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </Grid>
            <Grid size={size}>
              <FormUserBox
                error={error.email}
                label="Email: "
                value={newUser.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </Grid>

            {/* row4 */}
            <Grid size={size}>
              <FormUserBox
                label="Street: "
                value={newUser.address.street}
                onChange={(e) => updateAddressField("street", e.target.value)}
              />
            </Grid>
            <Grid size={size}>
              <FormUserBox
                label="Suite: "
                value={newUser.address.suite}
                onChange={(e) => updateAddressField("suite", e.target.value)}
              />
            </Grid>

            {/* row5 */}
            <Grid size={size}>
              <FormUserBox
                label="City: "
                value={newUser.address.city}
                onChange={(e) => updateAddressField("city", e.target.value)}
              />
            </Grid>
            <Grid size={size}>
              <FormUserBox
                label="Zip code: "
                value={newUser.address.zipcode}
                onChange={(e) => updateAddressField("zipcode", e.target.value)}
              />
            </Grid>

            {/* row6 */}
            <Grid size={size}>
              <FormUserBox
                label="Phone: "
                value={newUser.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </Grid>
            <Grid size={size}>
              <FormUserBox
                error={error.website}
                label="Website: "
                value={newUser.website}
                onChange={(e) => updateField("website", e.target.value)}
              />
            </Grid>

            {/* row7*/}
            <Grid size={size}>
              <FormUserBox
                label="Company: "
                value={newUser.company.name}
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
