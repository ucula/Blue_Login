export function decodeToken(token: string) {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (error) {
    return null;
  }
}
