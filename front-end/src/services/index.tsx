import * as auth from "./auth/index";
import * as user from "./admin/index";
import * as base from "./base/sendEmail";

const service = {
  auth,
  user,
  base,
};

export default service;
