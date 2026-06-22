import type { User, UserError } from "@/types/user";

export function hasInput(
  fields: (keyof User)[],
  form: Partial<User>,
  setEvent: (key: keyof UserError, value: string) => void,
): boolean {
  let isValid = true;
  for (const key of fields) {
    if (!form[key] || String(form[key]).trim() === "") {
      setEvent(key as keyof UserError, "required *");
      isValid = false;
    }
  }
  return isValid;
}
