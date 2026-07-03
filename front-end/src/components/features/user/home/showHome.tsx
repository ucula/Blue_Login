import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Grid,
  InputAdornment,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HomeIcon from "@mui/icons-material/Home";
import LoadingTemp from "@/components/common/skeleton/loadingTemp";
import type { User } from "@/types/user/user";
import useHome from "@/components/features/user/home/useHome";

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
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        bgcolor: "#ffffff",
      }}
    >
      {/* Left Sidebar */}
      <Stack
        spacing={4}
        sx={{
          width: 280,
          bgcolor: "#f8fafc",
          borderRight: "1px solid #e2e8f0",
          p: 3,
          flexShrink: 0,
        }}
      >
        {/* Logo Section */}
        <Stack spacing={0.5}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              fontSize: "24px",
              letterSpacing: "-0.5px",
            }}
          >
            ExpertAdmin
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              color: "#64748b",
              fontWeight: 500,
            }}
          >
            System Management
          </Typography>
        </Stack>

        {/* Sidebar Menu */}
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<HomeIcon />}
            sx={{
              bgcolor: "#1d4ed8",
              color: "#ffffff",
              borderRadius: "12px",
              py: 1.5,
              px: 3,
              fontWeight: 700,
              justifyContent: "flex-start",
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#1e40af",
                boxShadow: "none",
              },
            }}
          >
            Home
          </Button>
        </Box>
      </Stack>

      {/* Main Content Area */}
      <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
        {/* Topbar */}
        <Box
          sx={{
            height: 70,
            borderBottom: "1px solid #e2e8f0",
            px: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          {/* Topbar Left Navigation */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Typography
              sx={{
                fontWeight: 800,
                color: "#0f172a",
                fontSize: "18px",
                letterSpacing: "-0.3px",
              }}
            >
              ExpertAdmin
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "15px",
                color: "#0f172a",
                borderBottom: "3px solid #0f172a",
                pb: 2.2,
                mt: 2.2,
                cursor: "pointer",
              }}
            >
              Home
            </Typography>
          </Box>

          {/* Topbar Right - User Profile with red badge */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              variant="dot"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#dc2626",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  border: "2px solid #ffffff",
                },
              }}
            >
              <AccountCircleOutlinedIcon
                sx={{ fontSize: 28, color: "#475569", cursor: "pointer" }}
              />
            </Badge>
          </Box>
        </Box>

        {/* Content Body */}
        <Stack spacing={4} sx={{ p: 5, flexGrow: 1, overflowY: "auto" }}>
          {/* Header */}
          <Stack spacing={1}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "#0f172a",
                fontSize: "36px",
                letterSpacing: "-1px",
              }}
            >
              Brief Users
            </Typography>
            <Typography
              sx={{
                color: "#475569",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              Manage global directory and individual user permissions from a
              single view.
            </Typography>
          </Stack>

          {/* Search and Add Bar */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              placeholder="Search by Username, Name, or Email..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#94a3b8" }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                bgcolor: "#ffffff",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "& fieldset": {
                    borderColor: "#cbd5e1",
                  },
                  "&:hover fieldset": {
                    borderColor: "#94a3b8",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0f172a",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleAdd}
              startIcon={<AddIcon />}
              sx={{
                bgcolor: "#000000",
                color: "#ffffff",
                borderRadius: "8px",
                px: 3,
                py: 1.5,
                fontWeight: 700,
                fontSize: "14px",
                textTransform: "none",
                flexShrink: 0,
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#1e293b",
                  boxShadow: "none",
                },
              }}
            >
              ADD
            </Button>
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
        </Stack>
      </Stack>
    </Box>
  );
}
