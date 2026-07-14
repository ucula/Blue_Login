export const PATHS = {
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
  ADD_VERIFY: "/admin/add/verify",
  ADMIN_USER_INFO: {
    route: "/admin/users/:id",
    build: (id: string | number) => `/admin/users/${id}`,
  },
  ADMIN_INFO_EDIT: {
    route: "/admin/users/:id/edit",
    build: (id: string | number) => `/admin/users/${id}/edit`,
  },
  USER_HOME: "/users",
  USER_PASS: "/users/add/pass",
} as const;
