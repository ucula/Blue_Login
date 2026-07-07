import { Typography, Grid, Stack } from "@mui/material";
import { ChevronRightIcon } from "@/components/common/baseComponents/icons";
import LoadingTemp from "@/components/common/skeleton/loadingTemp";
import type { User } from "@/types/user/user";
import useHome from "./useHome";
import {
  DashboardContainer,
  TableContainer,
  TableHeaderRow,
  TableBodyRow,
} from "@/components/common/baseComponents/layout";
import { HomeHeader } from "@/components/common/baseComponents/header";
import { SearchBar } from "@/components/common/baseComponents/tool";
import { AddUserButton } from "@/components/common/baseComponents/button";

interface TableHeaderCellProps {
  size: number;
  label: string;
}

interface TableCellProps {
  size: number;
  value: string;
  weight?: number;
  color?: string;
}

function TableHeaderCell({ size, label }: TableHeaderCellProps) {
  return (
    <Grid size={size}>
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 700,
          color: "#000000ff",
          letterSpacing: "0.5px",
        }}
      >
        {label}
      </Typography>
    </Grid>
  );
}

function TableCell({
  size,
  value,
  weight = 500,
  color = "#334155",
}: TableCellProps) {
  return (
    <Grid size={size}>
      <Typography
        sx={{
          fontWeight: weight,
          color: color,
          fontSize: "17px",
        }}
      >
        {value}
      </Typography>
    </Grid>
  );
}

export default function showHome() {
  const {
    users,
    isPending,
    filterText,
    handleAdd,
    handleInfo,
    setFilterText,
    filteredUsers,
  } = useHome();

  return (
    <DashboardContainer activeTab="Home">
      <HomeHeader />

      {/* Search and Add Bar */}
      <Stack direction="row" spacing={2}>
        <SearchBar
          value={filterText}
          onChange={setFilterText}
          placeholder="Search by Username, Name, or Email..."
        />
        <AddUserButton onClick={handleAdd} />
      </Stack>

      {/* Users List Table */}
      {isPending || !users ? (
        <LoadingTemp label="Loading" />
      ) : users.length === 0 ? (
        <LoadingTemp label="No User yet" />
      ) : (
        <TableContainer>
          {/* Table Header */}
          <TableHeaderRow>
            <TableHeaderCell size={3} label="USERNAME" />
            <TableHeaderCell size={3} label="NAME" />
            <TableHeaderCell size={3.5} label="EMAIL" />
            <TableHeaderCell size={2} label="STATUS" />
            <Grid size={0.5} />
          </TableHeaderRow>

          {/* Table Body Rows */}
          {filteredUsers().map((user: User) => (
            <TableBodyRow key={user._id}>
              <TableCell size={3} weight={700} value={user.username} />
              <TableCell size={3} value={user.name} />
              <TableCell size={3.5} value={user.email} />
              <TableCell
                size={2}
                value={user.confirmed ? "Verified" : "Unverified"}
                color={user.confirmed ? "#10b981" : "#ef4444"}
                weight={700}
              />
              <Grid
                size={0.5}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <ChevronRightIcon
                  onClick={() => handleInfo(user._id)}
                  sx={{
                    color: "#94a3b8",
                    cursor: "pointer",
                  }}
                />
              </Grid>
            </TableBodyRow>
          ))}
        </TableContainer>
      )}
    </DashboardContainer>
  );
}
