import {
  AppShell,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Flex,
  Grid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import classes from "../components/navbar.module.css";
import {
  IconArrowLeft,
  IconCalendarStats,
  IconCookie,
  IconDeviceGamepad2,
  IconGauge,
  IconHome2,
  IconLogout,
  IconUser,
  IconUsersGroup,
  IconUsersPlus,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { UserData } from "./types/UserData";
import { renderTestResult } from "./RenderTestResult";

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon size={20} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: "Home" },
  { icon: IconGauge, label: "Dashboard" },
  { icon: IconUsersGroup, label: "Group" },
  { icon: IconCalendarStats, label: "Calendar" },
  { icon: IconDeviceGamepad2, label: "Talent Mapping" },
  { icon: IconUser, label: "Account" },
];

interface MainDashProps {
  data: UserData | null;
}

export function MainDash({ data }: MainDashProps) {
  const [active, setActive] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  const testResults = data?.testResult ?? [];

  return (
    <AppShell navbar={{ width: 100, breakpoint: "sm" }} padding={"md"}>
      <AppShell.Navbar p={"md"}>
        <nav className={classes.navbar} style={{ borderRadius: "20px" }}>
          <Center>
            <Button>
              <IconCookie size={30} stroke={2} />
            </Button>
          </Center>

          <div className={classes.navbarMain}>
            <Stack justify="center" gap={0}>
              {links}
            </Stack>
          </div>

          <Stack justify="center" gap={0}>
            <NavbarLink
              icon={IconLogout}
              label="Logout"
              onClick={handleLogout}
            ></NavbarLink>
          </Stack>
        </nav>
      </AppShell.Navbar>
      <AppShell.Main pl={120} pr={20} pb={40}>
        <Box>
          <Box ml={50} mb={10} mt={10}>
            <Title order={3} c={"blue"}>
              Halo, {data?.dataDiri.name ?? "User"} 👋
            </Title>
          </Box>
          <Box display={"flex"} my={30} w={500}>
            <Flex direction={"column"}>
              <Flex>
                <Title order={4} ml={50} c={"blue"}>
                  Dashboard
                </Title>
              </Flex>
              <Text ml={50}>
                Informasi Penilaian dan Hasil Tes yang Dilakukan
              </Text>
            </Flex>
          </Box>

          <Box w={500} h={320} ml={20}>
            <Card
              padding={70}
              radius={"md"}
              withBorder
              style={{
                background:
                  "linear-gradient(to bottom, #00ffff,rgb(255, 255, 255) )",
              }}
            >
              <ThemeIcon>
                <IconUsersPlus />
              </ThemeIcon>
              <Text fw={400} mt={10} mb={10}>
                Invite someone to join your group to make group disscussion and
                manage group with Group Features
              </Text>
              <Button w={250}>
                <IconArrowLeft style={{ marginRight: "10" }} />
                Invite your People
              </Button>
            </Card>
          </Box>

          <Box mt={10}>
            {testResults.length > 0 && (
              <Box mt={50}>
                <Title order={3} ml={50} mb={30} c="blue">
                  📑 Hasil Tes Kamu
                </Title>

                <Grid mx={50} gutter="md">
                  {testResults.map((test, index) => (
                    <Grid.Col
                      span={{ base: 12, sm: 6, lg: 4 }}
                      key={test._id ?? index}
                    >
                      <Card shadow="md" radius="lg" withBorder>
                        <Card.Section
                          p="md"
                          style={{
                            backgroundColor: "#f1f5ff",
                            borderRadius: "8px",
                          }}
                        >
                          <Flex justify="space-between" align="center">
                            <Title order={5} c="indigo">
                              {test.typeTest?.toUpperCase() ??
                                "Tidak diketahui"}
                            </Title>
                            <Badge color="blue" variant="light">
                              {test.date
                                ? new Date(test.date).toLocaleDateString(
                                    "id-ID",
                                    {
                                      weekday: "short",
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )
                                : "-"}
                            </Badge>
                          </Flex>
                        </Card.Section>

                        <Divider my="sm" />

                        <Box
                          style={{
                            overflowX: "auto",
                            backgroundColor: "#4dabf7",
                            padding: "10px",
                            borderRadius: "8px",
                          }}
                        >
                          <Box
                            size="sm"
                            c="white"
                            style={{ whiteSpace: "pre-wrap" }}
                          >
                            {renderTestResult(test)}
                          </Box>
                        </Box>
                      </Card>
                    </Grid.Col>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
