import {
  Box,
  Dialog,
  DialogContent,
  Alert,
  AlertTitle,
  Button,
  DialogActions,
  Typography,
} from "@mui/material";

export default function modalAlert({
  del,
  l_button,
  r_button,
  l_method,
  r_method,
}) {
  return (
    <Box>
      <Dialog open={del}>
        <DialogContent sx={{ p: 0 }}>
          <Alert severity="warning">
            <AlertTitle sx={{ color: "black" }}>Warning</AlertTitle>
            <Typography variant="subtitle2">
              This will delete the existing data permanently!
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={l_method} color="inherit">
            {l_button}
          </Button>
          <Button
            onClick={r_method}
            sx={{ backgroundColor: "red" }}
            variant="contained"
          >
            {r_button}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
