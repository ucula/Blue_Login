export const updateForm = (
  key: string,
  value: string,
  setter: (func: any) => void,
) => {
  setter((prev: any) => ({ ...prev, [key]: value.trim() }));
};
