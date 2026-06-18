import { login, resetPass, signup, verifyEmail } from "./auth/index";
import { create, del, get, list, update } from "./CRUD/index";

export default {
  create,
  del,
  get,
  list,
  update,
  signup,
  login,
  resetPass,
  verifyEmail,
};
