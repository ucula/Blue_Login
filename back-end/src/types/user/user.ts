interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoLocation;
}

interface GeoLocation {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  _id: string;
  name: string;
  pass: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  confirmed?: boolean;
  role?: string;
}

export type { User, Address, GeoLocation, Company };
