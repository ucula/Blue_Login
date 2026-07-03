import { Box, Typography, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LoadingTemp from "@/components/common/skeleton/loadingTemp";
import type { User } from "@/types/user/user";
import useHome from "@/components/features/user/home/useHome";
import { DashboardContainer } from "@/components/common/baseComponents/layout";
import { BriefHeader } from "@/components/common/baseComponents/header";
import { SearchBar } from "@/components/common/baseComponents/tool";
import { BaseButton } from "@/components/common/baseComponents/button";

export default function showHome() {
  const {
    users,
    filterText,
    handleAdd,
    handleInfo,
    setFilterText,
    filteredUsers,
  } = useHome();

  return (
    <DashboardContainer activeTab="Home">
      <BriefHeader
        title="Brief Users"
        subtitle="Manage global directory and individual user permissions from a single view."
      />

      {/* Search and Add Bar */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <SearchBar
          value={filterText}
          onChange={setFilterText}
          placeholder="Search by Username, Name, or Email..."
        />
        <BaseButton onClick={handleAdd} startIcon={<AddIcon />}>
          ADD
        </BaseButton>
      </Box>

      {/* Users List Table */}
      {!users ? (
        <LoadingTemp label="Loading" />
      ) : users.length === 0 ? (
        <LoadingTemp label="No User yet" />
      ) : (
        <Box
          sx={{
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            overflow: "hidden",
            bgcolor: "#ffffff",
          }}
        >
          {/* Table Header */}
          <Grid
            container
            sx={{
              bgcolor: "#f8fafc",
              py: 1.8,
              px: 3,
              borderBottom: "1px solid #cbd5e1",
              alignItems: "center",
            }}
          >
            <Grid item xs={3.5}>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#64748b",
                  letterSpacing: "0.5px",
                }}
              >
                USERNAME
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#64748b",
                  letterSpacing: "0.5px",
                }}
              >
                NAME
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#64748b",
                  letterSpacing: "0.5px",
                }}
              >
                EMAIL
              </Typography>
            </Grid>
            <Grid item xs={0.5} />
          </Grid>

          {/* Table Body Rows */}
          {filteredUsers().map((user: User) => (
            <Grid
              container
              key={user._id}
              onClick={() => handleInfo(user._id)}
              sx={{
                py: 2.2,
                px: 3,
                borderBottom: "1px solid #e2e8f0",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "#f8fafc",
                },
                "&:last-child": {
                  borderBottom: "none",
                },
              }}
            >
              <Grid item xs={3.5}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#0f172a",
                    fontSize: "15px",
                  }}
                >
                  {user.username}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    color: "#334155",
                    fontSize: "15px",
                  }}
                >
                  {user.name}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  sx={{
                    color: "#475569",
                    fontSize: "15px",
                    fontWeight: 450,
                  }}
                >
                  {user.email}
                </Typography>
              </Grid>
              <Grid
                item
                xs={0.5}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <ChevronRightIcon sx={{ color: "#94a3b8" }} />
              </Grid>
            </Grid>
          ))}
        </Box>
      )}
    </DashboardContainer>
  );
}
