import pkg from "../../package.json";

export const APP_NAME = pkg.productName;
export const APP_VERSION = pkg.version;

export const DEFAULT_FOCUS_SETTINGS = {
  TIMER: {
    // Minutes
    DEFAULT_MINS: 30,
    MIN_MINS: 5,
    MAX_MINS: 120,
  },
  DEFAULT_TAGS: ["study", "work", "meditation", "exercise", "break"],
} as const;
