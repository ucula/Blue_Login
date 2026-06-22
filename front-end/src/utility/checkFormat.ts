import type { User, UserError } from "@/types/user";
import { EMAIL_REGEX, WEBSITE_REGEX } from ".";

export function correctFormat(
  fields: (keyof User)[],
  form: Partial<User>,
  setEvent: (key: keyof UserError, value: string) => void,
): boolean {
  let isValid = true;
  for (const key of fields) {
    if (key === "email") {
      const email = form.email;
      if (email && String(email).trim() !== "") {
        if (!EMAIL_REGEX.test(email)) {
          setEvent("email", "Please use Email format");
          isValid = false;
        }
      }
    }
    if (key === "website") {
      const website = form.website;
      if (website && String(website).trim() !== "") {
        if (!WEBSITE_REGEX.test(website)) {
          setEvent("website", "Please use Website format");
          isValid = false;
        }
      }
    }
    if (key === "pass") {
      const pass = form.pass;
      if (pass && String(pass).trim() !== "" && pass.length < 8) {
        setEvent("pass", "Password must be longer than 8 characters");
        isValid = false;
      }
    }
  }
  return isValid;
}
