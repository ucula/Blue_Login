import type { User } from "../user/user";

interface Auth {
  _id: string;
  email: string;
  token: string;
  isUsed: boolean;
  createdAt: Date;
}

interface SignupForm extends User {
  pass: string;
  confirmPass: string;
}

interface SignupFormError {
  username: string;
  name: string;
  email: string;
  pass: string;
  confirmPass: string;
  website?: string;
}

interface LoginForm {
  email: string;
  pass: string;
}

interface LoginFormError {
  email: string;
  pass: string;
}

interface ResetPassForm extends LoginForm {
  confirmPass: string;
}

type ResetPassFormError = LoginFormError;

export type {
  Auth,
  SignupForm,
  SignupFormError,
  LoginForm,
  LoginFormError,
  ResetPassForm,
  ResetPassFormError,
};
