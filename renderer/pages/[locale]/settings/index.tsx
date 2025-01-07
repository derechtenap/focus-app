import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProperties } from "@/lib/getStatic";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import SettingsLayout from "@/components/layout/SettingsLayout";
import { IconUserDown, IconUserEdit, IconUserMinus } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useRouter } from "next/router";
import useDefaultProfile from "hooks/getDefaultProfile";
import deleteProfileFromDatabase from "@/lib/db/profiles/deleteProfile";
import { notifications } from "@mantine/notifications";
import { v4 as uuidv4 } from "uuid";
import addProfileToDatabase from "@/lib/db/profiles/addProfile";

const SettingsPage = () => {
  const defaultProfile = useDefaultProfile();

  const router = useRouter();
  const {
    t,
    i18n: { language: locale },
  } = useTranslation();

  const handleDeleteProfile = () => {
    modals.openConfirmModal({
      title: t("settings:deleteProfile.title"),
      children: <Text>{t("settings:deleteProfile.confirmText")}</Text>,
      labels: {
        confirm: t("settings:deleteProfile.title"),
        cancel: t("cancel"),
      },
      overlayProps: {
        backgroundOpacity: 0.75,
        blur: 3,
      },
      onConfirm: () => {
        if (!defaultProfile) throw new Error("Unable to delete the profile!");

        deleteProfileFromDatabase(defaultProfile.uuid).catch((e) => {
          console.error(e);
        });

        window.ipc.removeDefaultProfileUUID();
        void router.push(`/${locale}/welcome`);
      },
    });
  };

  const handleSetDebugProfile = () => {
    const uuid = uuidv4();

    addProfileToDatabase({
      age: 18,
      bio: "I'm a debug profile",
      email: "",
      name: "Debug Profile",
      uuid,
    })
      .then(() => {
        window.ipc.setDefaultProfileUUID(uuid);
        notifications.show({
          title: "Profile Added",
          message: "A profile has been added to the database.",
        });
      })
      .catch(
        (error: Error) => (
          notifications.show({
            title: "Unable to Add Profile",
            message: `An error occurred adding the debug profile to the database (${error.message})`,
          }),
          console.error("Error adding debug profile to database", error)
        )
      );
  };

  const handleDeleteDebugProfile = () => {
    if (!defaultProfile) return;

    deleteProfileFromDatabase(defaultProfile.uuid)
      .then(() => {
        window.ipc.removeDefaultProfileUUID();
        notifications.show({
          title: "Profile Removed",
          message: "The default profile has been removed from the database.",
        });
      })
      .catch(
        (error: Error) => (
          notifications.show({
            title: "Unable to Remove Profile",
            message: `An error occurred removing the debug profile to the database (${error.message})`,
          }),
          console.error("Error removing debug profile to database", error)
        )
      );
  };

  return (
    <SettingsLayout route="/">
      <Stack>
        {defaultProfile ? (
          <>
            <Title>{t("routes.profile")}</Title>
            <Text>{t("settings:profile.text")}</Text>
            <Group>
              <Stack gap={0}>
                <Text>{defaultProfile.name}</Text>
                <Group>
                  <Button
                    disabled={defaultProfile !== undefined}
                    onClick={() => handleSetDebugProfile()}
                  >
                    Add Debug Profile
                  </Button>
                  <Button
                    disabled={!defaultProfile}
                    onClick={() => handleDeleteDebugProfile()}
                  >
                    Remove Debug Profile
                  </Button>
                </Group>
                <Text>{JSON.stringify(defaultProfile)}</Text>
              </Stack>
            </Group>
            <Button.Group mt="lg">
              <Button
                onClick={() => void router.push(`/${locale}/profile/edit`)}
                variant="default"
                leftSection={<IconUserEdit />}
              >
                {t("profile:editProfile")}
              </Button>
              <Button disabled leftSection={<IconUserDown />} variant="default">
                {t("profile:exportProfile")}
              </Button>
              <Button
                leftSection={<IconUserMinus />}
                onClick={() => handleDeleteProfile()}
              >
                {t("settings:deleteProfile.title")}
              </Button>
            </Button.Group>
          </>
        ) : null}
      </Stack>
    </SettingsLayout>
  );
};

export default SettingsPage;

export const getStaticProps = makeStaticProperties([
  "common",
  "profile",
  "settings",
]);

export { getStaticPaths };
