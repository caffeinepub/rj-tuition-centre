const TIMINGS_KEY = "rj_class_timings";
const CREDS_KEY = "rj_admin_creds";

export interface ClassTimings {
  display: string;
  useCustom: boolean;
  customText: string;
}

const DEFAULT_TIMINGS: ClassTimings = {
  display: "6 AM \u2013 6 PM",
  useCustom: false,
  customText: "",
};

export function getClassTimings(): ClassTimings {
  try {
    const raw = localStorage.getItem(TIMINGS_KEY);
    if (raw) return { ...DEFAULT_TIMINGS, ...JSON.parse(raw) };
  } catch {}
  return { ...DEFAULT_TIMINGS };
}

export function setClassTimings(timings: ClassTimings): void {
  localStorage.setItem(TIMINGS_KEY, JSON.stringify(timings));
}

export interface AdminCredentials {
  username: string;
  password: string;
}

const DEFAULT_CREDS: AdminCredentials = {
  username: "rjkyadmin",
  password: "rjkytuitioadmin",
};

export function getAdminCredentials(): AdminCredentials {
  try {
    const raw = localStorage.getItem(CREDS_KEY);
    if (raw) return { ...DEFAULT_CREDS, ...JSON.parse(raw) };
  } catch {}
  return { ...DEFAULT_CREDS };
}

export function setAdminCredentials(creds: AdminCredentials): void {
  localStorage.setItem(CREDS_KEY, JSON.stringify(creds));
}
