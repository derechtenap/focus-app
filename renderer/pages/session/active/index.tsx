import type { NextPage } from "next";
import DefaultLayout from "@components/layout/DefaultLayout";
import {
  Button,
  Center,
  RingProgress,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { readSessionStorageValue, useInterval } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { formatTimerTime } from "@utils/timer/formatTimerTime";

const SessionPage: NextPage = () => {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);
  const interval = useInterval(() => setSeconds((s) => s + 1), 1000);

  const sessionData = readSessionStorageValue({
    key: "currentSession",
    deserialize: (data) => {
      if (data) {
        return JSON.parse(data) as FocusSession;
      }

      return undefined;
    },
  });

  if (!sessionData) {
    return void router.push("/");
  }

  const isSessionFinished = seconds >= sessionData.minutes * 60;

  useEffect(() => {
    interval.start();

    if (isSessionFinished) {
      interval.stop();
    }
  }, [seconds]);

  return (
    <DefaultLayout disableAppShell>
      <Center h="100%">
        <Stack>
          <RingProgress
            size={600}
            label={
              <Center>
                {isSessionFinished ? (
                  <ThemeIcon radius="50%" size={200} color="dark.5">
                    <IconCheck style={{ width: "70%", height: "70%" }} />
                  </ThemeIcon>
                ) : (
                  <Text size="xl" fw="bold">
                    {formatTimerTime(sessionData.minutes * 60 - seconds)}
                  </Text>
                )}
              </Center>
            }
            sections={[
              {
                color: "green",
                value:
                  100 -
                  ((sessionData.minutes * 60 - seconds) /
                    (sessionData.minutes * 60)) *
                    100,
              },
            ]}
          />
          <Button
            bg={isSessionFinished ? "green" : "red"}
            w="fit-content"
            mx="auto"
            onClick={() => void router.push("/")}
          >
            {isSessionFinished ? "Finish Session" : "Abort Session"}
          </Button>
        </Stack>
      </Center>
    </DefaultLayout>
  );
};

export default SessionPage;
