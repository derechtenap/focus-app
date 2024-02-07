import type { UUID } from "crypto";

export {};

declare global {
  declare type FocusSession = {
    startedAt: number;
    minutes: number;
    tag: string;
    uuid: UUID;
    // sessionProgress: number; // Number between 0-100 [%]
    isAborted: boolean;
  };
}
