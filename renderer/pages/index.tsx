import type { NextPage } from "next";
import {
  Button,
  Center,
  Combobox,
  Container,
  Input,
  InputBase,
  RingProgress,
  Slider,
  SliderProps,
  Stack,
  Text,
  Title,
  useCombobox,
} from "@mantine/core";
import DefaultLayout from "@components/layout/DefaultLayout";
import { useInputState } from "@mantine/hooks";
import { DEFAULT_FOCUS_SETTINGS } from "@utils/constants";
import { IconTag } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { randomUUID } from "crypto";

/**
 *
 * @author Tim Deres <derechtenap>
 *
 * @returns {JSX.Element}
 *
 */
const IndexPage: NextPage = (): JSX.Element => {
  const [focusMinutes, setMinutes] = useInputState<number>(
    DEFAULT_FOCUS_SETTINGS.TIMER.DEFAULT_MINS
  );
  const [focusTag, setFocusTag] = useInputState<string>("");

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const router = useRouter();

  const sliderOptions: SliderProps["marks"] = [
    {
      label: "5 min.",
      value: 5,
    },
    // For min < 120 min... 20min steps
    ...Array.from({ length: 6 }, (_, index) => ({
      label: `${(index + 1) * 20} min.`,
      value: (index + 1) * 20,
    })),
  ];

  const options = DEFAULT_FOCUS_SETTINGS.DEFAULT_TAGS.map((tag) => (
    <Combobox.Option value={tag} key={tag}>
      {tag}
    </Combobox.Option>
  ));

  const startFocus = () => {
    const focusSessionData: FocusSession = {
      startedAt: Date.now(),
      minutes: focusMinutes,
      tag: focusTag,
      uuid: randomUUID(),
      isAborted: false,
      isCompleted: false,
    };

    // Go to active session route with session data
    void router.push("/session/active", {
      query: { session: JSON.stringify(focusSessionData, null, 2) },
    });
  };

  return (
    <DefaultLayout>
      <Center h="100%">
        <Container w="100%" maw={600}>
          <Stack align="center" gap="xl" w="100%">
            <Title c="dark.1" fz="lg" fw="normal" ta="center">
              Hello, {"{username}"}! You focused{" "}
              <Text component="span" fw="bold">
                0 minutes
              </Text>{" "}
              today.
            </Title>
            <RingProgress
              label={
                <Text ta="center">
                  Let's focus for{" "}
                  <Text
                    fz="sm"
                    c="green"
                    fw={900}
                    component="span"
                    truncate="end"
                  >
                    {focusMinutes} minutes
                  </Text>{" "}
                  together!
                </Text>
              }
              size={300}
              thickness={15}
              roundCaps
              sections={[{ color: "green", value: (focusMinutes / 120) * 100 }]}
              mb={0}
            />
            <Slider
              w="100%"
              mb="md"
              defaultValue={DEFAULT_FOCUS_SETTINGS.TIMER.DEFAULT_MINS}
              labelTransitionProps={{
                transition: "pop",
                duration: 200,
              }}
              showLabelOnHover={false}
              marks={sliderOptions}
              min={DEFAULT_FOCUS_SETTINGS.TIMER.MIN_MINS}
              max={DEFAULT_FOCUS_SETTINGS.TIMER.MAX_MINS}
              onChange={(minutes) => setMinutes(minutes)}
            />
            <Combobox
              store={combobox}
              onOptionSubmit={(tag) => {
                setFocusTag(tag);
                combobox.closeDropdown();
              }}
            >
              <Combobox.Target>
                <InputBase
                  leftSection={<IconTag size="16px" />}
                  component="button"
                  type="button"
                  pointer
                  rightSection={<Combobox.Chevron />}
                  rightSectionPointerEvents="none"
                  onClick={() => combobox.toggleDropdown()}
                >
                  {focusTag || <Input.Placeholder>Pick Tag</Input.Placeholder>}
                </InputBase>
              </Combobox.Target>
              <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>
            <Button
              autoContrast
              mx="auto"
              variant="gradient"
              gradient={{ from: "green", to: "blue", deg: 140 }}
              onClick={() => startFocus()}
            >
              Let's Start!
            </Button>
          </Stack>
        </Container>
      </Center>
    </DefaultLayout>
  );
};

export default IndexPage;
