import type { UserError } from "@/types/user/error";
import type { UserForm } from "@/types/user/form";

export function hasInput(
  fields: (keyof UserForm)[],
  form: Partial<UserForm>,
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
