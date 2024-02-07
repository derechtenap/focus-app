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
import { useInterval } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { formatTimerTime } from "@utils/timer/formatTimerTime";

const SessionPage: NextPage = () => {
  const [seconds, setSeconds] = useState(0);
  const interval = useInterval(() => setSeconds((s) => s + 1), 1000);
  const sessionParams = new URLSearchParams(document.location.search);
  const sessionData = sessionParams.get("session");
  const router = useRouter();

  if (!sessionData) {
    throw new Error("No Session Data found!");
  }

  const parsedSessionData = JSON.parse(sessionData) as FocusSession;
  const isSessionFinished = seconds >= parsedSessionData.minutes * 60;

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
                    {formatTimerTime(parsedSessionData.minutes * 60 - seconds)}
                  </Text>
                )}
              </Center>
            }
            sections={[
              {
                color: "green",
                value:
                  100 -
                  ((parsedSessionData.minutes * 60 - seconds) /
                    (parsedSessionData.minutes * 60)) *
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
