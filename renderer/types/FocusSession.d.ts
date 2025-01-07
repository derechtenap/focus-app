// TODO: Check if more properties are needed
declare type FocusSession = {
  startedAt: number; // Unix timestamp
  minutes: number;
  tag: string;
  sessionProgress: number; // Number between 0-100 [%]
  isAborted: boolean;
};
