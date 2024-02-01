import {
  ActionIcon,
  AppShell,
  Avatar,
  Divider,
  Group,
  ScrollArea,
  Stack,
  Text,
  rem,
} from "@mantine/core";
import { useDisclosure, useFullscreen } from "@mantine/hooks";
import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconPlant,
  IconSquareMinus,
  IconSquareXFilled,
} from "@tabler/icons-react";
import { APP_NAME } from "@utils/constants";
import { ipcRenderer } from "electron";

type DefaultLayoutProps = {
  children: React.ReactNode;
  disableAppShell?: boolean;
};

export const headerHeight = 45;
export const navbarWidth = 140;
export const asideWidth = 80;

const DefaultLayout = ({ children, disableAppShell }: DefaultLayoutProps) => {
  const [openedNavbar, { toggle: toggleNavbar }] = useDisclosure();
  // const [openedAside, { toggle: toggleAside }] = useDisclosure();
  const { fullscreen: appIsFullscreen, toggle: toggleFullscreen } =
    useFullscreen();
  return (
    <AppShell
      aside={{
        breakpoint: "xs",
        collapsed: {
          // Currently disabled
          desktop: true,
          mobile: true,
        },
        width: {
          md: asideWidth,
          lg: asideWidth + 50,
          xl: asideWidth + 75,
        },
      }}
      header={{
        collapsed: false,
        height: headerHeight,
      }}
      navbar={{
        breakpoint: "xs",
        collapsed: {
          desktop: openedNavbar,
          mobile: true,
        },
        width: {
          md: navbarWidth,
          lg: navbarWidth + 40,
          xl: navbarWidth + 80,
        },
      }}
      disabled={disableAppShell}
    >
      <AppShell.Header>
        <Group h="100%" justify="space-between" mah={headerHeight} mx="md">
          <Group>
            <ActionIcon
              gradient={{ from: "green", to: "blue", deg: 140 }}
              variant="gradient"
              onClick={toggleNavbar}
            >
              <IconPlant />
            </ActionIcon>
            <Text fz="xs" tt="uppercase">
              {APP_NAME}
            </Text>
          </Group>
          <div>Center</div>
          <Group>
            <ActionIcon
              c="gray"
              variant="transparent"
              onClick={() => ipcRenderer.send("minimize-app-window")}
            >
              <IconSquareMinus style={{ width: rem(22), height: rem(22) }} />
            </ActionIcon>
            <ActionIcon
              c="gray"
              variant="transparent"
              onClick={() => void toggleFullscreen()}
            >
              {appIsFullscreen ? (
                <IconArrowsMinimize
                  style={{ width: rem(22), height: rem(22) }}
                />
              ) : (
                <IconArrowsMaximize
                  style={{ width: rem(22), height: rem(22) }}
                />
              )}
            </ActionIcon>
            <ActionIcon c="gray" variant="transparent">
              <IconSquareXFilled style={{ width: rem(22), height: rem(22) }} />
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>
      <AppNavbar />
      <AppShell.Main h={`calc(100vh - ${headerHeight}px)`}>
        {children}
      </AppShell.Main>
      <AppShell.Aside h={`calc(100% - ${headerHeight}px)`} pb="md">
        <AppShell.Section
          component={ScrollArea.Autosize}
          scrollbarSize={4}
          offsetScrollbars
          grow
        >
          <Stack my="md">
            {Array(25)
              .fill(0)
              .map((_, index) => (
                <Avatar key={index} mx="auto" />
              ))}
          </Stack>
        </AppShell.Section>
      </AppShell.Aside>
    </AppShell>
  );
};

export const AppNavbar = () => {
  return (
    <AppShell.Navbar h={`calc(100% - ${headerHeight}px)`}>
      <AppShell.Section
        component={ScrollArea.Autosize}
        scrollbarSize={4}
        grow
        pb="md"
      >
        ScrollArea
      </AppShell.Section>
      <Divider />
      <AppShell.Section bg="dark.8" py="lg">
        <Avatar mx="auto" />
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default DefaultLayout;
