import type { MantineColor } from "@mantine/core";

export {};

declare global {
  declare type FocusSession = {
    startedAt: number;
    minutes: number;
    tag: string;
    uuid: string;
    // sessionProgress: number; // Number between 0-100 [%]
    isAborted: boolean;
  };

  declare type Profile = {
    color: MantineColor;
    coins: number;

    createdAt: number;
    updatedAt: number;

    name: {
      firstName: string;
      lastName: string;
    };
    username: string;
  };
}
