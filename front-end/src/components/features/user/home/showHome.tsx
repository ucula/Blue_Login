import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import BriefInfoBox from "./components/infoBox";
import LoadingTemp from "@/components/common/skeleton/loadingTemp";
import type { User } from "@/types/user";
import { Box, Grid, Stack } from "@mui/material";
import Header from "@/components/common/baseComponents/header/header";
import useHome from "./useHome";

export default function showHome() {
  const {
    users,
    filterText,
    handleAdd,
    handleInfo,
    handleBack,
    setFilterText,
    filteredUsers,
  } = useHome();
  return (
    <Box>
      <Header label="Brief Users" handlenavigate={handleBack} />
      <Grid container sx={{ marginBottom: 5 }}>
        <Grid size={11}>
          <TextField
            sx={{
              backgroundColor: "transparent",
              width: "97%",
            }}
            id="filled-search"
            label="Search for Username, Name and Email"
            type="search"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </Grid>
        <Grid size={1}>
          <Button
            sx={{ height: "100%", width: "100%" }}
            variant="contained"
            onClick={handleAdd}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      {!users ? (
        <LoadingTemp label="Loading" />
      ) : users.length === 0 ? (
        <LoadingTemp label="No User yet" />
      ) : (
        <Stack spacing={5}>
          {filteredUsers().map((user: User) => (
            <BriefInfoBox
              key={user._id}
              user={user}
              onClick={() => {
                handleInfo(user._id);
              }}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
