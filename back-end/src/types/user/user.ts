import type { Address } from "./address";
import type { Company } from "./company";

export interface User {
  _id?: string;
  pass: string;
  name: string;
  username: string;
  email: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
}
