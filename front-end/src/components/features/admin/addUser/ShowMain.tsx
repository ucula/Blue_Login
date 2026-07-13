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
import SendingTemp from "@/components/common/skeleton/sendingTemp";
import SendTemp from "@/components/common/baseComponents/sendTemp/sendTemp";
import { UserFormFields } from "@/components/common/baseComponents/form/UserFormFields";
import useMain from "./useMain";
import { PATHS, TABS } from "@/constants";

export default function showAddUser() {
  const {
    isPending,
    isSuccess,
    errForm,
    form,
    setForm,
    handleSave,
    handleHome,
  } = useMain();

  if (isPending) return <SendingTemp />;
  if (isSuccess)
    return (
      <SendTemp
        email={form.email}
        path={PATHS.ADD_VERIFY}
        hasSendAgain={true}
      />
    );
  return (
    <DashboardContainer activeTab={TABS.DASHBOARD}>
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
