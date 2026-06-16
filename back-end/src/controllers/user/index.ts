import {
  createUser,
  updateUserById,
  deleteuserById,
  getUserById,
  getUser,
} from "./CRUD/index";
import { signup, login } from "./auth/index";

export default {
  createUser,
  deleteuserById,
  getUser,
  getUserById,
  updateUserById,
  signup,
  login,
};
