import { Select, MenuItem } from "@mui/material";

interface DropdownProps {
  value: number;
  onChange: (value: number) => void;
  options: { label: string | number; value: number }[];
}

export function Dropdown({ value, onChange, options }: DropdownProps) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      sx={{
        borderRadius: "10px",
        bgcolor: "#f1f5f9",
        width: "130px",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#cbd5e1",
        },
      }}
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </Select>
  );
}
