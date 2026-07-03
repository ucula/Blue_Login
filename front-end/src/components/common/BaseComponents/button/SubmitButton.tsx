import { Button, type ButtonProps } from "@mui/material";

export function SubmitButton({ children, ...props }: ButtonProps) {
  return (
    <Button
      fullWidth
      variant="contained"
      {...props}
      sx={{
        backgroundColor: "#000000",
        color: "#ffffff",
        borderRadius: "12px",
        padding: "12px",
        fontWeight: 600,
        textTransform: "none",
        fontSize: "26px",
        boxShadow: "none",
        "&:hover": {
          backgroundColor: "#212529",
          boxShadow: "none",
        },
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
}
