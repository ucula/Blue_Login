export function hasInput(
  fields: string[],
  form: any,
  setEvent: (key: string, value: any) => void,
): boolean {
  let isValid = true;
  for (const key of fields) {
    if (!form[key] || String(form[key]).trim() === "") {
      setEvent(key as string, "required *");
      isValid = false;
    }
  }
  return isValid;
}
