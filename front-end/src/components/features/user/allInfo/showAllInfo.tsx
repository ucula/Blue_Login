import LoadingTemp from "@/components/common/skeleton/loadingTemp";
import { Box, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import BusinessIcon from "@mui/icons-material/Business";
import FaceIcon from "@mui/icons-material/Face";
import ShowHeader from "@/components/common/baseComponents/header/header";
import FootButton from "@/components/common/baseComponents/footButton/footButton";
import ModalAlert from "@/components/common/baseComponents/modalAlert/modalAlert";
import GridBox from "@/components/features/user/components/GridBlock";
import useAllInfo from "@/components/features/user/allInfo/useAllInfo";

export default function showAllInfo() {
  const {
    isLoading,
    user,
    del,
    handledialogue,
    handleHome,
    handleEdit,
    handleDelete,
  } = useAllInfo();
  const { username, name, email, address, phone, website, company } =
    user || {};

  return isLoading ? (
    <LoadingTemp label="Loading user profile..." />
  ) : (
    <Box>
      <ShowHeader label="User Profile" handlenavigate={handleHome} />
      <Box>
        <Grid
          container
          rowSpacing={8}
          sx={{
            justifySelf: "center",
            justifyContent: "space-between",
            width: "80%",
          }}
        >
          <GridBox
            icon={[<AccountCircleIcon />]}
            size={12}
            text={[`Username: ${username}`]}
          />

          <GridBox
            icon={[<FaceIcon />, <EmailIcon />]}
            size={5}
            text={[`Name: ${name}`, `Email: ${email}`]}
          />

          <GridBox
            icon={[<HomeIcon />]}
            size={12}
            text={[
              <>
                Address:{" "}
                <span>{`${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`}</span>
              </>,
            ]}
          />

          <GridBox
            icon={[<PhoneIcon />, <LanguageIcon />]}
            size={5}
            text={[`Phone: ${phone}`, `Website: ${website}`]}
          />

          <GridBox
            icon={[<BusinessIcon />]}
            size={12}
            text={[
              <>
                Company: <span>{`${company.name}`}</span>
              </>,
            ]}
          />
        </Grid>
      </Box>
      <FootButton label="Edit" handlemethod={handleEdit} />
      <FootButton
        color="error"
        top={2}
        label="Delete"
        handlemethod={handledialogue}
      />
      <ModalAlert
        del={del}
        l_button="Cancel"
        r_button="Delete"
        l_method={handledialogue}
        r_method={handleDelete}
      />
    </Box>
  );
}
