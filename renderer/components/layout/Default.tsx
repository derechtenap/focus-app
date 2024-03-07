import ButtonWithTooltip from "@components/content/ButtonWithTooltip";
import {
  AppShell,
  Avatar,
  Container,
  Divider,
  Flex,
  Group,
  NavLink,
  NumberFormatter,
  ScrollAreaAutosize,
  Text,
} from "@mantine/core";
import {
  upperFirst,
  useDisclosure,
  useFullscreen,
  useNetwork,
  useOs,
} from "@mantine/hooks";
import {
  IconCoins,
  IconMenu2,
  IconMinus,
  IconPlant,
  IconSettings,
  IconShoppingBag,
  IconSquare,
  IconSquareX,
  IconSquaresDiagonal,
} from "@tabler/icons-react";
import { i18n, useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { APP_NAME, APP_VERSION } from "utils/constants";
import sendIPC from "utils/ipc/send";

type DefaultLayoutProps = {
  children: React.ReactNode;
  withNavbarOpen: boolean;
};

export const headerHeight = 50; // px
export const navbarWidth = 200; // px

const DefaultLayout = ({
  children,
  withNavbarOpen = true,
}: DefaultLayoutProps) => {
  const { toggle: toggleFullscreen, fullscreen } = useFullscreen();
  const [isNavbarOpened, { toggle: toggleNavbar }] =
    useDisclosure(withNavbarOpen);
  const CLIENT_OS = useOs();
  const NETWORK_STATUS = useNetwork();

  const router = useRouter();
  const locale = i18n?.language as string;
  const { t } = useTranslation(["common"]);

  const navbarRoutes = [
    {
      icon: <IconPlant />,
      label: t("routes.home"),
      route: "/",
    },
    {
      icon: <IconShoppingBag />,
      label: t("routes.shop"),
      route: "/shop",
    },
    {
      icon: <IconSettings />,
      label: t("routes.settings"),
      route: "/settings",
    },
  ];

  const isActiveRoute = (route: string) => {
    if (route === "/") {
      return `/${locale + route}` === router.asPath;
    }

    return `/${locale + route}/` === router.asPath;
  };

  return (
    <AppShell
      header={{
        height: headerHeight,
      }}
      navbar={{
        width: {
          // `md` is the smallest used breakpoint since the app requires 1024x768 pixels
          md: navbarWidth,
          lg: navbarWidth * 1.25,
          xl: navbarWidth * 1.4,
        },
        breakpoint: "xs",
        collapsed: {
          mobile: !isNavbarOpened,
          desktop: !isNavbarOpened,
        },
      }}
    >
      <AppShell.Header className="draggable">
        <Flex
          align="center"
          justify="space-between"
          h={headerHeight}
          mah={headerHeight}
          px="sm"
          w="100%"
        >
          <Group gap="lg">
            <ButtonWithTooltip
              actionIconProps={{
                c: "gray",
                onClick: toggleNavbar,
                variant: "transparent",
              }}
              label={t("toggleNavigation")}
            >
              <IconMenu2 />
            </ButtonWithTooltip>
            <Text fz="sm" ta="center" tt="uppercase">
              {APP_NAME}
            </Text>
          </Group>
          <Group gap="lg">
            <Group mr="lg">
              <Avatar
                color="grape"
                size="md"
                onClick={() => void router.push(`/${locale}/profile`)}
                style={{
                  cursor: "pointer",
                }}
              >
                RLU
              </Avatar>
              <Text maw={120} truncate="end">
                Really Long Username
              </Text>
            </Group>
            <Group gap="xs" fw="bold">
              <ButtonWithTooltip
                actionIconProps={{
                  onClick: () => void router.push(`/${locale}/shop`),
                  variant: "default",
                }}
                label={t("tooltipCoins", { coins: 0 })}
              >
                <IconCoins />
              </ButtonWithTooltip>
              <NumberFormatter value={0} />
            </Group>
            {!fullscreen ? (
              <ButtonWithTooltip
                actionIconProps={{
                  c: "dimmed",
                  onClick: () => sendIPC("minimize-app-window"),
                  variant: "transparent",
                }}
                label={t("minimizeApp")}
              >
                <IconMinus />
              </ButtonWithTooltip>
            ) : null}
            <ButtonWithTooltip
              actionIconProps={{
                c: "dimmed",
                onClick: () => void toggleFullscreen(),
                variant: "transparent",
              }}
              label={fullscreen ? t("windowedMode") : t("fullscreenMode")}
            >
              {fullscreen ? <IconSquaresDiagonal /> : <IconSquare />}
            </ButtonWithTooltip>
            <ButtonWithTooltip
              actionIconProps={{
                c: "dimmed",
                onClick: () => sendIPC("close-app"),
                variant: "transparent",
              }}
              label={t("closeApp")}
            >
              <IconSquareX />
            </ButtonWithTooltip>
          </Group>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar>
        <AppShell.Section component={ScrollAreaAutosize} grow>
          {navbarRoutes.map((route) => (
            <NavLink
              active={isActiveRoute(route.route)}
              key={route.route}
              label={route.label}
              leftSection={route.icon}
              variant="filled"
              onClick={() => void router.push(`/${locale + route.route}`)}
            />
          ))}
        </AppShell.Section>
        <Divider />
        <AppShell.Section p="lg">
          <Text c="dimmed" ta="center">
            <Text component="span" fz="xs" display="block">
              {APP_VERSION}
            </Text>
            <Text component="span" fz="xs" display="block">
              {upperFirst(CLIENT_OS)}
            </Text>
            <Text component="span" fz="xs" display="block">
              {t("networkStatus.label")}
              {": "}
              {NETWORK_STATUS.online
                ? t("networkStatus.online")
                : t("networkStatus.offline")}
            </Text>
          </Text>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <Container
          px={{
            xs: 0,
          }}
        >
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default DefaultLayout;
