import {
  createUser,
  updateUserById,
  deleteuserById,
  getUserById,
  getUser,
} from "./CRUD/index";
import { signup, login, resetPass } from "./auth/index";
import { verifyEmail } from "./auth/verifyEmail";

export default {
  createUser,
  deleteuserById,
  getUser,
  getUserById,
  updateUserById,
  signup,
  login,
  resetPass,
  verifyEmail,
};
