import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlined";
import BaseTemp from "./baseTemp";

export default function ErrorTemp({ label }: { label: string }) {
  return (
    <BaseTemp
      icon={<ErrorOutlineIcon sx={{ fontSize: 60, color: "#ef4444", mb: 2 }} />}
      label={label}
      labelColor="#64748b"
    />
  );
}
