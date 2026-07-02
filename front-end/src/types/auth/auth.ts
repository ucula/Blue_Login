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

interface ResetPassFormError extends LoginFormError {}

export type {
  Auth,
  SignupForm,
  SignupFormError,
  LoginForm,
  LoginFormError,
  ResetPassForm,
  ResetPassFormError,
};
