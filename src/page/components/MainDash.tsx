import {
  AppShell,
  Badge,
  Box,
  Card,
  Center,
  Divider,
  Flex,
  Grid,
  Stack,
  Text,
  Title,
  Tooltip,
  UnstyledButton,
  Progress,
  Checkbox,
  ActionIcon,
} from "@mantine/core";
import classes from "../components/navbar.module.css";
import {
  IconCookie,
  IconDeviceGamepad2,
  IconGauge,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router";
import { country, type UserData } from "./types/UserData";
import { renderTestResult } from "./RenderTestResult";
import { PieChart } from "@mantine/charts";

// ✅ Tambahkan union type TestType
type TestType = "personality" | "tpm" | "ls" | "st" | "sw" | "aw" | "iq";

// ✅ Komponen NavbarLink
interface NavbarLinkProps {
  icon: typeof IconGauge;
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

// ✅ Data link navbar
const mockdata = [
  { icon: IconGauge, label: "Dashboard", path: "/dashboard" },
  { icon: IconDeviceGamepad2, label: "Test", path: "/test" },
  { icon: IconUser, label: "Account", path: "/account" },
];

interface MainDashProps {
  data: UserData | null;
}

export function MainDash({ data }: MainDashProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const links = mockdata.map((link) => (
    <NavbarLink
      key={link.label}
      icon={link.icon}
      label={link.label}
      active={location.pathname === link.path}
      onClick={() => navigate(link.path)}
    />
  ));

  const testResults = data?.testResult ?? [];

  const allTests: TestType[] = [
    "personality",
    "tpm",
    "ls",
    "st",
    "sw",
    "aw",
    "iq",
  ];

  const completedTests: TestType[] = testResults
    .map((t) => t.typeTest as TestType)
    .filter((t): t is TestType => allTests.includes(t));

  const completedSet = new Set<TestType>(completedTests);
  const progressPercent = Math.round(
    (completedSet.size / allTests.length) * 100
  );

  return (
    <AppShell navbar={{ width: 100, breakpoint: "sm" }} padding={"md"}>
      <AppShell.Navbar p={"md"}>
        <nav className={classes.navbar} style={{ borderRadius: "20px" }}>
          <Center>
            <ActionIcon color="cyan.4">
              <IconCookie color="white" size={25} stroke={2} />
            </ActionIcon>
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
            />
          </Stack>
        </nav>
      </AppShell.Navbar>

      <AppShell.Main pl={120} pr={20} pb={40}>
        <Box>
          <Box ml={50} mb={10} mt={10}>
            <Title order={3} c="cyan.4" ff="monospace">
              Halo, {data?.dataDiri.name ?? "User"} 👋
            </Title>
          </Box>

          <Flex justify="space-between" align="flex-start" mx={50} my={20}>
            {/* Box Nama Sekolah */}
            <Box
              w={300}
              h="100%"
              p="md"
              ff="monospace"
              style={{ border: "2px solid cyan", borderRadius: "8px" }}
            >
              <Flex direction={"column"}>
                <Flex>
                  <Title order={4} ml={5} c="cyan.4">
                    Nama Sekolah
                  </Title>
                </Flex>
                <Text mb={5} ml={5}>
                  SMAN 1 Bandung
                </Text>
                <Title order={4} ml={5} c="cyan.4">
                  Alamat Sekolah
                </Title>
                <Text ml={5}>Jl. Ir.H. Djuanda Dago</Text>
                <PieChart
                  h={200}
                  withLabelsLine
                  labelsPosition="inside"
                  labelsType="percent"
                  withLabels
                  data={country}
                />
              </Flex>
            </Box>

            {/* Box Progress */}
            <Box ml="auto" w={500} ff="monospace">
              <Card shadow="md" padding="md" radius="md" withBorder>
                <Title order={5} mb={10} c="cyan.4">
                  📈 Progress Tes
                </Title>

                <Progress
                  value={progressPercent}
                  color={progressPercent === 100 ? "green" : "blue"}
                  size="lg"
                  radius="xl"
                  striped
                  animated
                />
                <div style={{ marginBottom: "10px", marginTop: "4px" }}>
                  <Text>{progressPercent}%</Text>
                </div>

                <Flex direction="column" gap={8}>
                  {allTests.map((testType) => (
                    <Checkbox
                      key={testType}
                      label={testType.toUpperCase()}
                      checked={completedSet.has(testType)}
                      readOnly
                      color={completedSet.has(testType) ? "green" : "gray"}
                    />
                  ))}
                </Flex>
              </Card>
            </Box>
          </Flex>

          {/* ✅ Hasil Tes */}
          {testResults.length > 0 && (
            <Box mt={50}>
              <Title order={3} ml={50} mb={30} c="cyan.4">
                📑 Hasil Tes Kamu
              </Title>

              <Box mb={40} mx={50}>
                <Grid gutter="md">
                  {allTests.map((type) => {
                    const filtered = testResults.filter(
                      (t) => t.typeTest === type
                    );
                    if (filtered.length === 0) return null;

                    return filtered.map((test, index) => (
                      <Grid.Col
                        span={{ base: 12, sm: 6, lg: 3 }}
                        key={test._id ?? index}
                      >
                        <Card
                          shadow="md"
                          radius="lg"
                          withBorder
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                          }}
                        >
                          <Card.Section
                            p="md"
                            style={{
                              backgroundColor: "#f1f5ff",
                              borderRadius: "8px",
                            }}
                          >
                            <Flex justify="space-between" align="center">
                              <Title order={5} c="cyan.4">
                                {test.typeTest?.toUpperCase() ??
                                  "Tidak diketahui"}
                              </Title>
                              <Badge color="cyan.4" variant="light">
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
                              backgroundColor: "#3bc9db",
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
                    ));
                  })}
                </Grid>
              </Box>
            </Box>
          )}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
