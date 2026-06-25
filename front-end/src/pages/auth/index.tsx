import { Login } from "./login";
import { Main as Signup, EmailSent, Verify as SignupVerify } from "./signup";
import {
  Main as ResetEmail,
  Pass as ResetPass,
  Send as ResetSend,
  Verify as ResetVerify,
} from "./resetPass";
import { ProtectedRoute } from "../ProtectedRoute";

export {
  Login,
  Signup,
  EmailSent,
  SignupVerify,
  ResetEmail,
  ResetPass,
  ResetSend,
  ResetVerify,
  ProtectedRoute,
};
