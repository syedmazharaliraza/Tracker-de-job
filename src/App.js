import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import Nav from "./components/Nav";
import AppTabs from "./components/AppBody/AppTabs";

export default function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      navbar={
        <Navbar
          p='md'
          hiddenBreakpoint='sm'
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Nav />
        </Navbar>
      }
      header={
        <Header height={70} p='md'>
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan='sm' styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size='sm'
                color={theme.colors.gray[6]}
                mr='xl'
              />
            </MediaQuery>{" "}
            <Text size={24} weight={600}>
              Tracker <i>de</i> Job
            </Text>
          </div>
        </Header>
      }
    >
      <AppTabs />
    </AppShell>
  );
}
