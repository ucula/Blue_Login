import { Box, Grid } from "@mui/material";
import { type User } from "@/types/user";

export default function BriefInfoBox({
  user: { _id, username, name, email },
  onClick,
}: {
  user: User;
  onClick: () => void;
}) {
  return (
    <Box
      sx={{
        justifyItems: "center",
        border: "1px solid black",
        borderRadius: "6px",
        height: "70px",
        alignContent: "center",
      }}
      key={_id}
    >
      <Grid container sx={{ width: "90%", fontSize: 20 }}>
        <Grid size={3.8}>{`Username: ${username}`}</Grid>
        <Grid size={3.8}>{`Name: ${name}`}</Grid>
        <Grid size={3.8}>{`Email: ${email}`}</Grid>
        <Grid
          size="grow"
          sx={{ textAlign: "end", color: "black", ":hover": { color: "gray" } }}
          onClick={onClick}
          style={{ cursor: "pointer" }}
        >
          &gt;
        </Grid>
      </Grid>
    </Box>
  );
}
