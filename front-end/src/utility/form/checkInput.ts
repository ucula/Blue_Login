export function hasInput(
  fields: (keyof any)[],
  form: any,
  setEvent: (key: keyof any, value: any) => void,
): boolean {
  let isValid = true;
  for (const key of fields) {
    if (!form[key] || String(form[key]).trim() === "") {
      setEvent(key as keyof any, "required *");
      isValid = false;
    }
  }
  return isValid;
}
