import { Grid, Stack, Divider } from "@mui/material";
import {
  DashboardContainer,
  TableContainer,
} from "@/components/common/baseComponents/layout";
import { AddUserHeader } from "@/components/common/baseComponents/header";
import {
  SaveButton,
  BackButton,
} from "@/components/common/baseComponents/button";
import useAddUser from "./useAddUser";
import SendingTemp from "@/components/common/skeleton/sendingTemp";
import { UserFormFields } from "@/components/common/baseComponents/form/UserFormFields";

export default function showAddUser() {
  const { isPending, errForm, form, setForm, handleSave, handleHome } =
    useAddUser();

  return isPending ? (
    <SendingTemp />
  ) : (
    <DashboardContainer activeTab="Home">
      <Stack spacing={4} sx={{ width: "100%" }}>
        <AddUserHeader />

        {/* Textfields Border Box */}
        <TableContainer sx={{ p: 6 }}>
          <UserFormFields form={form} setForm={setForm} errForm={errForm} />

          <Divider sx={{ my: 4, borderColor: "#cbd5e1" }} />

          <Grid container spacing={2}>
            <Grid size={6}>
              <BackButton onClick={handleHome} fullWidth />
            </Grid>
            <Grid size={6}>
              <SaveButton onClick={handleSave} fullWidth />
            </Grid>
          </Grid>
        </TableContainer>
      </Stack>
    </DashboardContainer>
  );
}
