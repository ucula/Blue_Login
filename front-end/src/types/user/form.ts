import type { User } from "./user";

export interface UserForm extends User {
  confirm: string;
  accConfirmed: boolean;
}
