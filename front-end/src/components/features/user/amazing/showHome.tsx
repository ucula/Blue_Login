import { Fragment } from "react";
import { Grid, TextField, Stack, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { DashboardContainer } from "@/components/common/baseComponents/layout/container/DashboardContainer";
import { TableContainer } from "@/components/common/baseComponents/layout";
import { Dropdown } from "@/components/common/baseComponents/tool";
import { ConfirmModal } from "@/components/common/baseComponents/modalAlert/modalAlert";
import {
  SaveButton,
  DiscardButton,
} from "@/components/common/baseComponents/button";
import useHome from "./useHome";

export default function ShowHome() {
  const {
    daysInMonth,
    NUM_ROW,
    NUM_OF_BOXES_PER_ROW,
    BOX_SPACE,
    boxForm,
    setBoxForm,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    handlePrevMonth,
    handleNextMonth,
    monthOptions,
    yearOptions,
    handleSave,
    handleDiscard,
    isEditing,
    discardModalRef,
    openDiscardModal,
    isPrevDisabled,
    isNextDisabled,
  } = useHome();

  return (
    <DashboardContainer activeTab="Task">
      <TableContainer sx={{ p: 3 }}>
        {/* Year and month selection */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 3, mb: 1, justifyContent: "center", alignItems: "center" }}
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
        <Stack spacing={BOX_SPACE}>
          {Array.from({ length: NUM_ROW }).map((_, rowIndex) => (
            <Grid
              container
              key={`row-${rowIndex}`}
              sx={{ justifyContent: "center" }}
            >
              {Array.from({ length: NUM_OF_BOXES_PER_ROW }).map(
                (_, colIndex) => {
                  const dayNum = rowIndex * NUM_OF_BOXES_PER_ROW + colIndex + 1;
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
                            onChange={(e) =>
                              setBoxForm({
                                ...boxForm,
                                [dayNum]: e.target.value,
                              })
                            }
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

        {/* Action Buttons Stack */}
        {isEditing && (
          <Stack spacing={2} sx={{ mt: 4, mr: 4, justifyContent: "flex-end" }}>
            <SaveButton onClick={handleSave} />
            <DiscardButton onClick={openDiscardModal} />
          </Stack>
        )}
      </TableContainer>

      <ConfirmModal
        ref={discardModalRef}
        title="Discard Changes"
        description="Are you sure you want to discard your changes? This action cannot be undone."
        onConfirm={handleDiscard}
        confirmText="Discard"
      />
    </DashboardContainer>
  );
}
