import LoadingTemp from "@/components/common/skeleton/loadingTemp";
import { Grid, Stack, Divider } from "@mui/material";
import { UserProfileHeader } from "@/components/common/baseComponents/header";
import {
  DashboardContainer,
  TableContainer,
} from "@/components/common/baseComponents/layout";
import ConfirmModal from "@/components/common/baseComponents/modalAlert/modalAlert";
import useConfirmModal from "@/components/common/baseComponents/modalAlert/useConfirmModal";
import useAllInfo from "./useAllInfo";
import {
  EditButton,
  DeleteButton,
  SaveButton,
  CancelButton,
  BackButton,
  SendAgainButton,
} from "@/components/common/baseComponents/button";
import { UserFormFields } from "@/components/common/baseComponents/form/UserFormFields";
import { AllInfoFields } from "./AllInfoFields";

export default function showAllInfo() {
  const {
    isLoading,
    user,
    isEditing,
    setIsEditing,
    form,
    gridSize,
    setForm,
    errForm,
    handleHome,
    handleSave,
    handleCancel,
    handleDelete,
    handleSendAgain,
    isSendingEmail,
  } = useAllInfo();

  const { modalRef: deleteModalRef, openModal: openDeleteModal } = useConfirmModal();

  const { address } = user || {};

  const addressStr = address
    ? [address.street, address.suite, address.city, address.zipcode].some(
        (x) => x,
      )
      ? `${address.street || ""}, ${address.suite || ""}, ${address.city || ""}, ${address.zipcode || ""}`
      : ", , ,"
    : "Not provided";

  return isLoading ? (
    <LoadingTemp label="Loading user profile..." />
  ) : (
    <DashboardContainer activeTab="Home">
      <Stack spacing={4} sx={{ width: "100%", mx: "auto", mt: 2 }}>
        <TableContainer sx={{ p: 5 }}>
          <UserProfileHeader />

          <Divider sx={{ mb: 4, borderColor: "#cbd5e1" }} />

          {/* Display or Edit User Profile Information */}
          {isEditing ? (
            <UserFormFields form={form} setForm={setForm} errForm={errForm} />
          ) : (
            <AllInfoFields user={user} addressStr={addressStr} />
          )}

          <Divider sx={{ mb: 4, borderColor: "#cbd5e1" }} />

          {/* Action Buttons */}
          <Stack spacing={2}>
            {isEditing ? (
              <>
                <SaveButton onClick={handleSave} fullWidth />
                <CancelButton onClick={handleCancel} fullWidth />
              </>
            ) : (
              <Grid container spacing={2}>
                <Grid size={gridSize}>
                  <BackButton onClick={handleHome} fullWidth />
                </Grid>
                {!user.confirmed && (
                  <Grid size={gridSize}>
                    <SendAgainButton
                      onClick={handleSendAgain}
                      disabled={isSendingEmail}
                      fullWidth
                    />
                  </Grid>
                )}
                <Grid size={gridSize}>
                  <EditButton onClick={() => setIsEditing(true)} fullWidth />
                </Grid>
                <Grid size={gridSize}>
                  <DeleteButton onClick={openDeleteModal} fullWidth />
                </Grid>
              </Grid>
            )}
          </Stack>
        </TableContainer>
      </Stack>

      <ConfirmModal
        ref={deleteModalRef}
        title="Warning"
        description="This will delete the existing data permanently!"
        onConfirm={handleDelete}
        confirmText="Delete"
      />
    </DashboardContainer>
  );
}
