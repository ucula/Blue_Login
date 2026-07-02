import { User } from "../user/user";

interface Auth {
  _id?: string;
  email: string;
  token: string;
  isUsed?: boolean;
  createdAt?: Date;
}

interface SignupForm extends User {
  pass: string;
  confirmPass: string;
}

interface LoginForm {
  email: string;
  pass: string;
}

interface ResetPassForm extends LoginForm {
  confirmPass: string;
}

export type { Auth, SignupForm, LoginForm, ResetPassForm };
