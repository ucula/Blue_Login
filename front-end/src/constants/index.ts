const NUM_OF_BOXES_PER_ROW = 4;
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// FRONT-END ----------------------
const PATHS = {
  // AUTH
  ROOT: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  SIGNUP_VERIFY: "/signup/verify",
  RESET: "/forgot",
  RESET_VERIFY: "/forgot/verify",
  RESET_PASSWORD: "/forgot/password",

  // HOME
  ADMIN_HOME: "/admin/home",
  ADMIN_ADD: "/admin/users/add",
  ADD_VERIFY: "/add/verify",
  ADMIN_USER_INFO: {
    route: "/admin/users/:id",
    build: (id: string | number) => `/admin/users/${id}`,
  },
  ADMIN_INFO_EDIT: {
    route: "/admin/users/:id/edit",
    build: (id: string | number) => `/admin/users/${id}/edit`,
  },
  ADMIN_USER_TASKS: {
    route: "/admin/users/:id/tasks",
    build: (id: string | number) => `/admin/users/${id}/tasks`,
  },
  USER_HOME: "/user",
  USER_PASS: "/users/add/pass",
};

// BACK-END ----------------------
const API_ADMIN_BASE = "http://localhost:5001/api/1/admin";
const API_AUTH_BASE = "http://localhost:5001/api/1/auth";
const API_BOX_BASE = "http://localhost:5001/api/1/boxForm";

const API = {
  // AUTH
  AUTH_LOGIN: `${API_AUTH_BASE}/login`,
  AUTH_SIGNUP: `${API_AUTH_BASE}/signup`,
  AUTH_SIGNUP_VERIFY: (token: string) =>
    `${API_AUTH_BASE}/signup/verify?token=${token}`,
  AUTH_SIGNUP_RESEND: `${API_AUTH_BASE}/signup/resend`,
  AUTH_RESET_PASSWORD: `${API_AUTH_BASE}/reset`,
  AUTH_RESET_VERIFY: (token: string) =>
    `${API_AUTH_BASE}/reset/verify?token=${token}`,
  AUTH_RESET_WITH_TOKEN: (token: string) =>
    `${API_AUTH_BASE}/reset?token=${token}`,

  // ADMIN
  USERS: `${API_ADMIN_BASE}/users`,
  USER_BY_ID: (id: string) => `${API_ADMIN_BASE}/users/${id}`,
  ADMIN_USER_TASKS: (id: string) => `${API_ADMIN_BASE}/users/${id}/tasks`,
  ADMIN_SEND_EMAIL: (id: string) => `${API_ADMIN_BASE}/users/email/${id}`,

  // USER
  USER_BOX: `${API_BOX_BASE}/box`,
};

const TABS = {
  DASHBOARD: "Dashboard",
  TASK: "Task",
} as const;

export { API, MONTHS, NUM_OF_BOXES_PER_ROW, PATHS, TABS };
