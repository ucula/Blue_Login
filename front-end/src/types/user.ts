export interface User {
  _id?: string;
  name: string;
  pass?: string;
  username: string;
  email: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
}

export interface Address {
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
  geo?: GeoLocation;
}

export interface GeoLocation {
  lat?: string;
  lng?: string;
}

export interface Company {
  name?: string;
  catchPhrase?: string;
  bs?: string;
}

export interface UserError {
  username: string;
  pass: string;
  name: string;
  email: string;
  website: string;
}
