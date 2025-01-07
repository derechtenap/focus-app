import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProperties } from "../../lib/getStatic";
import DefaultLayout from "@/components/layout/Default";
import { useRouter } from "next/router";
import { useSessionStorage } from "@mantine/hooks";
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
import { isInRange, useForm } from "@mantine/form";
import { IconTag } from "@tabler/icons-react";
import { DEFAULT_FOCUS_SETTINGS } from "utils/constants";

// TODO: Messy code here. Refactor later
// - Split code into smaller components
const IndexPage = () => {
  const {
    t,
    i18n: { language: locale },
  } = useTranslation();

  const router = useRouter();
  const sessionForm = useForm<FocusSession>({
    initialValues: {
      minutes: DEFAULT_FOCUS_SETTINGS.TIMER.DEFAULT_MINS,
      tag: "",
      startedAt: Date.now(),
      isAborted: false,
      sessionProgress: 0,
    },

    validate: {
      minutes: isInRange({
        min: DEFAULT_FOCUS_SETTINGS.TIMER.MIN_MINS,
        max: DEFAULT_FOCUS_SETTINGS.TIMER.MAX_MINS,
      }),
    },
  });

  const [, setCurrentSessionValue] = useSessionStorage({
    key: "currentSession",
    defaultValue: {},
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const sliderOptions: SliderProps["marks"] = [
    {
      label: t("xMinutes", { minutes: 5 }),
      value: 5,
    },
    // For min < 120 min... 20min steps
    ...Array.from({ length: 6 }, (_, index) => ({
      label: t("xMinutes", { minutes: (index + 1) * 20 }),
      value: (index + 1) * 20,
    })),
  ];

  const options = DEFAULT_FOCUS_SETTINGS.DEFAULT_TAGS.map((tag) => (
    <Combobox.Option value={tag} key={tag}>
      {t(`defaultTags.${tag}`)}
    </Combobox.Option>
  ));

  const setCurrentSession = () => {
    const sessionData = sessionForm.values;
    setCurrentSessionValue(sessionData);
    void router.push(`${locale}/session/active`);
  };

  return (
    <DefaultLayout withNavbarOpen>
      <Center h="100%">
        <Container w="100%" maw={600}>
          <Stack align="center" gap="xl" w="100%">
            <Title c="dark.1" fz="lg" fw="normal" ta="center">
              {t("greeting", { ns: "indexPage", time: 0, username: "Tim" })}
            </Title>
            <RingProgress
              label={
                <Text ta="center">
                  {t("ctaFocus", {
                    ns: "indexPage",
                    time: sessionForm.values.minutes,
                  })}
                </Text>
              }
              size={300}
              thickness={15}
              roundCaps
              sections={[
                {
                  color: "green",
                  value: (sessionForm.values.minutes / 120) * 100,
                },
              ]}
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
              {...sessionForm.getInputProps("minutes")}
            />
            <Combobox
              store={combobox}
              onOptionSubmit={(tag) => {
                sessionForm.setFieldValue("tag", tag);
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
                  {sessionForm.values.tag === "" ? (
                    <Input.Placeholder>
                      {t("pickTag", { ns: "indexPage" })}
                    </Input.Placeholder>
                  ) : (
                    <>{t(`defaultTags.${sessionForm.values.tag}`)}</>
                  )}
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
              onClick={() => setCurrentSession()}
              disabled={!sessionForm.isValid()}
            >
              {t("startFocus", { ns: "indexPage" })}
            </Button>
          </Stack>
        </Container>
      </Center>
    </DefaultLayout>
  );
};

export default IndexPage;

export const getStaticProps = makeStaticProperties(["common", "indexPage"]);

export { getStaticPaths };
