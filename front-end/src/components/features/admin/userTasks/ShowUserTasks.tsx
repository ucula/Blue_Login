import { Fragment } from "react";
import {
  Grid,
  TextField,
  Stack,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { DashboardContainer } from "@/components/common/baseComponents/layout/container/DashboardContainer";
import { TableContainer } from "@/components/common/baseComponents/layout";
import { Dropdown } from "@/components/common/baseComponents/tool";
import { BackButton } from "@/components/common/baseComponents/button";
import LoadingTemp from "@/components/common/skeleton/loadingTemp";
import ErrorTemp from "@/components/common/skeleton/errorTemp";
import useUserTasks from "./useUserTasks";
import { TABS } from "@/constants";

export default function ShowUserTasks() {
  const {
    user,
    isLoading,
    isError,
    daysInMonth,
    NUM_ROW,
    NUM_OF_BOXES_PER_ROW,
    BOX_SPACE,
    boxForm,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    handlePrevMonth,
    handleNextMonth,
    yearOptions,
    monthOptions,
    isPrevDisabled,
    isNextDisabled,
    handleBack,
  } = useUserTasks();

  return (
    <DashboardContainer activeTab={TABS.DASHBOARD}>
      <TableContainer sx={{ p: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 1, color: "#1e293b" }}
        >
          Tasks of {user?.name || user?.username || "User"}
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748b", mb: 3 }}>
          Viewing monthly task list for {user?.email}
        </Typography>

        <Divider sx={{ mb: 4, borderColor: "#cbd5e1" }} />

        {/* Year and month selection */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            mt: 3,
            mb: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handlePrevMonth} disabled={isPrevDisabled}>
            <ChevronLeftIcon />
          </IconButton>

          <Dropdown
            value={selectedYear}
            onChange={setSelectedYear}
            options={yearOptions}
          />

          <Dropdown
            value={selectedMonth}
            onChange={setSelectedMonth}
            options={monthOptions}
          />

          <IconButton onClick={handleNextMonth} disabled={isNextDisabled}>
            <ChevronRightIcon />
          </IconButton>
        </Stack>

        {/* Full rows */}
        <Stack sx={{ alignItems: "center", width: "100%" }}>
          {isLoading ? (
            <LoadingTemp label="Loading user tasks..." />
          ) : isError ? (
            <ErrorTemp label="No tasks yet" />
          ) : (
            <Stack spacing={BOX_SPACE} sx={{ width: "100%" }}>
              {Array.from({ length: NUM_ROW }).map((_, rowIndex) => (
                <Grid
                  container
                  key={`row-${rowIndex}`}
                  sx={{ justifyContent: "center" }}
                >
                  {Array.from({ length: NUM_OF_BOXES_PER_ROW }).map(
                    (_, colIndex) => {
                      const dayNum =
                        rowIndex * NUM_OF_BOXES_PER_ROW + colIndex + 1;
                      return (
                        <Fragment key={`day-${dayNum}`}>
                          <Grid size={BOX_SPACE} sx={{ p: 4 }}>
                            {dayNum <= daysInMonth && (
                              <TextField
                                id={`day${dayNum}`}
                                multiline
                                variant="outlined"
                                fullWidth
                                rows={5}
                                label={`Day ${dayNum}`}
                                value={boxForm[dayNum] || ""}
                                slotProps={{
                                  input: {
                                    readOnly: true,
                                  },
                                }}
                              />
                            )}
                          </Grid>
                        </Fragment>
                      );
                    },
                  )}
                </Grid>
              ))}
            </Stack>
          )}
        </Stack>

        <Divider sx={{ my: 4, borderColor: "#cbd5e1" }} />
        <Stack direction="row" sx={{ justifyContent: "flex-start" }}>
          <BackButton onClick={handleBack} sx={{ minWidth: 150 }} />
        </Stack>
      </TableContainer>
    </DashboardContainer>
  );
}
