import DefaultLayout, { headerHeight } from "@components/layout/Default";
import {
  Card,
  Container,
  Grid,
  ScrollArea,
  Skeleton,
  Tabs,
} from "@mantine/core";
import { IconLeaf, IconPhoto } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProperties } from "lib/get-static";

const ShopPage = () => {
  const { t } = useTranslation();

  return (
    <DefaultLayout withNavbarOpen>
      <Container ml={0} maw={1200} pl={0}>
        <Tabs
          orientation="vertical"
          defaultValue="plants"
          h={`calc(100vh - ${headerHeight}px)`}
        >
          <Tabs.List mr="xs">
            <Tabs.Tab value="plants" leftSection={<IconLeaf />}>
              {t("categories.plants", { ns: "shop" })}
            </Tabs.Tab>
            <Tabs.Tab value="backgrounds" leftSection={<IconPhoto />}>
              {t("categories.backgrounds", { ns: "shop" })}
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="plants">
            <ScrollArea.Autosize
              h={`calc(100vh - ${headerHeight}px)`}
              scrollbarSize={4}
              offsetScrollbars
            >
              <Grid m="md">
                {Array(25)
                  .fill(0)
                  .map((_, index) => (
                    <Grid.Col key={index} span={4}>
                      <Card p="sm">
                        <Skeleton height={50} circle mb="xl" />
                        <Skeleton height={8} radius="xl" />
                        <Skeleton height={8} mt={6} radius="xl" />
                        <Skeleton height={8} mt={6} width="70%" radius="xl" />
                      </Card>
                    </Grid.Col>
                  ))}
              </Grid>
            </ScrollArea.Autosize>
          </Tabs.Panel>
          <Tabs.Panel value="backgrounds">
            <ScrollArea.Autosize
              h={`calc(100vh - ${headerHeight}px)`}
              scrollbarSize={4}
              offsetScrollbars
            >
              <Grid m="md">
                {Array(25)
                  .fill(0)
                  .map((_, index) => (
                    <Grid.Col key={index} span={4}>
                      <Card p="sm">
                        <Skeleton height={50} circle mb="xl" />
                        <Skeleton height={8} radius="xl" />
                        <Skeleton height={8} mt={6} radius="xl" />
                        <Skeleton height={8} mt={6} width="70%" radius="xl" />
                      </Card>
                    </Grid.Col>
                  ))}
              </Grid>
            </ScrollArea.Autosize>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </DefaultLayout>
  );
};

export default ShopPage;

export const getStaticProps = makeStaticProperties(["common", "shop"]);

export { getStaticPaths };
