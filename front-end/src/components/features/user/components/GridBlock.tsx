import { Grid, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

export default function gridBox({
  size,
  icon,
  text,
}: {
  isdouble?: boolean;
  size?: number;
  icon?: ReactNode[];
  text?: ReactNode[];
}) {
  const isdouble = text.length > 1 && icon.length > 1;
  return (
    <>
      <Grid sx={{ textAlign: "center" }} size={size}>
        <Stack direction="row">
          {icon[0]}
          <Typography sx={{ verticalAlign: "center", fontSize: "20px" }}>
            {text[0]}
          </Typography>
        </Stack>
      </Grid>

      {!isdouble ? (
        <Grid size={12 - size - 2}></Grid>
      ) : (
        <Grid sx={{ textAlign: "center" }} size={size}>
          <Stack direction="row">
            {icon[1]}
            <Typography sx={{ fontSize: "20px" }}>{text[1]}</Typography>
          </Stack>
        </Grid>
      )}
    </>
  );
}
