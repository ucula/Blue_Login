import { Grid } from "@mui/material";
import {
  PersonOutlineIcon,
  EmailOutlinedIcon,
  FaceOutlinedIcon,
  HomeOutlinedIcon,
  LocalPhoneOutlinedIcon,
  LanguageOutlinedIcon,
  BusinessOutlinedIcon,
  VerifiedOutlinedIcon,
} from "@/components/common/baseComponents/icons";
import { InfoBlock } from "@/components/common/baseComponents/input";

interface AllInfoFieldsProps {
  user: any;
  addressStr: string;
}

export function AllInfoFields({ user, addressStr }: AllInfoFieldsProps) {
  const { username, name, email, phone, website, company } = user || {};
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {/* Username Field */}
      <Grid size={6}>
        <InfoBlock
          icon={<PersonOutlineIcon />}
          label="Username"
          value={username}
        />
      </Grid>

      {/* Email Field */}
      <Grid size={6}>
        <InfoBlock
          icon={<EmailOutlinedIcon />}
          label="Email"
          value={email}
        />
      </Grid>

      {/* Full Name Field */}
      <Grid size={6}>
        <InfoBlock
          icon={<FaceOutlinedIcon />}
          label="Name"
          value={name}
        />
      </Grid>

      {/* Address Field */}
      <Grid size={6}>
        <InfoBlock
          icon={<HomeOutlinedIcon />}
          label="Address"
          value={addressStr}
        />
      </Grid>

      {/* Phone Number Field */}
      <Grid size={6}>
        <InfoBlock
          icon={<LocalPhoneOutlinedIcon />}
          label="Phone"
          value={phone}
        />
      </Grid>

      {/* Website URL Field */}
      <Grid size={6}>
        <InfoBlock
          icon={<LanguageOutlinedIcon />}
          label="Website"
          value={website}
        />
      </Grid>

      {/* Company Name Field */}
      <Grid size={6}>
        <InfoBlock
          icon={<BusinessOutlinedIcon />}
          label="Company"
          value={company?.name}
        />
      </Grid>

      {/* Status Field */}
      <Grid size={6}>
        <InfoBlock
          icon={<VerifiedOutlinedIcon />}
          label="Status"
          value={user?.confirmed ? "Verified" : "Unverified"}
          color={user?.confirmed ? "#10b981" : "#ef4444"}
        />
      </Grid>
    </Grid>
  );
}
