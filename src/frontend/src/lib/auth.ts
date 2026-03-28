import { getAdminCredentials } from "@/utils/siteSettings";

const SESSION_KEY = "rjAdminAuth";

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}

export function setAdminAuthenticated(value: boolean): void {
  if (value) {
    sessionStorage.setItem(SESSION_KEY, "true");
  } else {
    sessionStorage.removeItem(SESSION_KEY);
  }
}

export function adminLogin(username: string, password: string): boolean {
  const creds = getAdminCredentials();
  if (username === creds.username && password === creds.password) {
    setAdminAuthenticated(true);
    return true;
  }
  return false;
}

export function adminLogout(): void {
  setAdminAuthenticated(false);
}
