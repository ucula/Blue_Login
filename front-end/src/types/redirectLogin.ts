export function redirectLogin(status: number) {
  if (status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
  }
}

