const PATHS = {
  ROOT: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  SIGNUP_EMAIL_SENT: "/signup/email-sent",
  RESET: "/reset",
  RESET_EMAIL_SENT: "/reset/email-sent",
  RESET_PASSWORD: "/reset/password",
  ADMIN_HOME: "/admin/home",
  ADMIN_ADD: "/admin/add",
  ADMIN_ADD_SEND: "/admin/add/send",
  ADMIN_USER_INFO: (id: string | number) => `/admin/user/info/${id}`,
  ADMIN_INFO_EDIT: (id: string | number) => `/admin/info/${id}/edit`,
  USER_ADD_PASS: "/user/add/pass",
};

const API_USER_BASE = "http://localhost:5001/api/v1/user";
const API_AUTH_BASE = "http://localhost:5001/api/v1/auth";

const API = {
  AUTH_LOGIN: `${API_USER_BASE}/auth/login`,
  AUTH_SIGNUP: `${API_USER_BASE}/auth/signup`,
  AUTH_SIGNUP_VERIFY: (token: string) =>
    `${API_USER_BASE}/auth/signup/verify?token=${token}`,
  AUTH_SIGNUP_RESEND: `${API_USER_BASE}/auth/signup/resend`,
  AUTH_RESET_PASSWORD: `${API_USER_BASE}/auth/reset-password`,
  AUTH_RESET_VERIFY: (token: string) =>
    `${API_USER_BASE}/auth/reset-password/verify?token=${token}`,
  AUTH_RESET_WITH_TOKEN: (token: string) =>
    `${API_USER_BASE}/auth/reset-password?token=${token}`,
  USERS: `${API_AUTH_BASE}/users`,
  USER_BY_ID: (id: string) => `${API_AUTH_BASE}/users/${id}`,
};

export { PATHS, API };

