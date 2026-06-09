import { Box } from "@mui/material";

export default function RectangleBox({ content }) {
  const inner_border = {
    padding: "50px 80px",
    border: "1px solid gray",
    borderRadius: 5,
    backgroundColor: "white",
  };

  const outer_border = {
    padding: "50px 80px",
  };

  return (
    <Box sx={outer_border}>
      <Box sx={inner_border}>{content}</Box>
    </Box>
  );
}
