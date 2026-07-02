import { Box, Typography } from "@mui/material";

export default function mainTemp({
  header,
  content,
}: {
  header?: string;
  content: any;
}) {
  return (
    <Box
      sx={{ alignContent: "center", justifyItems: "center", height: "700px" }}
    >
      <Box
        sx={{
          padding: "80px 90px",
          bgcolor: "white",
          width: "30%",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            justifyContent: "center",
            marginBottom: 6,
          }}
        >
          <Typography variant="h5">{header}</Typography>
        </Box>
        {content}
      </Box>
    </Box>
  );
}
