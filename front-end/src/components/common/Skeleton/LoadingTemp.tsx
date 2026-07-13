import { CircularProgress } from "@mui/material";
import BaseTemp from "./baseTemp";

export default function LoadingTemp({ label }: { label: string }) {
  return (
    <BaseTemp
      icon={<CircularProgress sx={{ mb: 2 }} />}
      label={label}
      labelColor="inherit"
    />
  );
}
