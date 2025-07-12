import {
  ActionIcon,
  AppShell,
  Badge,
  Box,
  Button,
  Card,
  CardSection,
  Center,
  Grid,
  GridCol,
  Group,
  Image,
  Stack,
  Text,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import {
  IconCookie,
  IconGauge,
  IconDeviceGamepad2,
  IconUser,
  IconLogout,
} from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router";
import classes from "./components/navbar.module.css";

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

const mockdata = [
  { icon: IconGauge, label: "Dashboard", path: "/dashboard" },
  { icon: IconDeviceGamepad2, label: "Test", path: "/test" },
  { icon: IconUser, label: "Account", path: "/account" },
];

export function TestPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeLabel = mockdata.find((item) =>
    location.pathname.startsWith(item.path)
  )?.label;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppShell navbar={{ width: 100, breakpoint: "sm" }} padding="md">
      <AppShell.Navbar p="md">
        <nav className={classes.navbar} style={{ borderRadius: "20px" }}>
          <Center>
            <ActionIcon color="cyan.4">
              <IconCookie color="white" size={25} stroke={2} />
            </ActionIcon>
          </Center>

          <div className={classes.navbarMain}>
            <Stack justify="center" gap={0}>
              {mockdata.map((link) => (
                <NavbarLink
                  key={link.label}
                  icon={link.icon}
                  label={link.label}
                  active={link.label === activeLabel}
                  onClick={() => navigate(link.path)}
                />
              ))}
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
        <Box my={30} mx={50}>
          <Title c="cyan.4" ff="monospace" size={30}>
            🎮 Talent Mapping
          </Title>
        </Box>

        <Box my={30} mx={50}>
          <Title c="cyan.4" size={25} mb={10}>
            Personality
          </Title>
          <Grid>
            <GridCol span={4}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <CardSection>
                  <Center>
                    <Image
                      src="/dims/tatsuya1.png"
                      alt="Tatsuya Shiba"
                      w={178}
                    />
                  </Center>
                </CardSection>
                <Group justify="space-between" mt={10} mb={10}>
                  <Text>Personality</Text>
                  <Badge color="cyan.4">Personality</Badge>
                </Group>
                <Button variant="filled" radius="md" color="cyan.4">
                  Start Test
                </Button>
              </Card>
            </GridCol>
            <GridCol span={4}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <CardSection>
                  <Center>
                    <Image src="/dims/girl1.png" alt="Girl1" w={185} />
                  </Center>
                </CardSection>
                <Group justify="space-between" mt={10} mb={10}>
                  <Text>Talent Mapping</Text>
                  <Badge color="cyan.4">Personality</Badge>
                </Group>
                <Button variant="filled" radius="md" color="cyan.4">
                  Start Test
                </Button>
              </Card>
            </GridCol>
            <GridCol span={4}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <CardSection>
                  <Center>
                    <Image src="/dims/girl2.png" alt="Girl2" w={170} />
                  </Center>
                </CardSection>
                <Group justify="space-between" mt={10} mb={10}>
                  <Text>Learning Style</Text>
                  <Badge color="cyan.4">Personality</Badge>
                </Group>
                <Button variant="filled" radius="md" color="cyan.4">
                  Start Test
                </Button>
              </Card>
            </GridCol>
          </Grid>
        </Box>

        <Box my={30} mx={50}>
          <Title c="cyan.4" size={25} mb={10}>
            Mentality Test
          </Title>
          <Grid>
            <GridCol span={4}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <CardSection>
                  <Center>
                    <Image src="/dims/girl6.png" alt="Girl6" w={285} />
                  </Center>
                </CardSection>
                <Group justify="space-between" mt={10} mb={10}>
                  <Text>Stress Tracker</Text>
                  <Badge color="cyan.7">Well-Being</Badge>
                </Group>
                <Button variant="filled" radius="md" color="cyan.4">
                  Start Test
                </Button>
              </Card>
            </GridCol>
            <GridCol span={4}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <CardSection>
                  <Center>
                    <Image src="/dims/girl4.png" alt="Girl4" w={185} />
                  </Center>
                </CardSection>
                <Group justify="space-between" mt={10} mb={10}>
                  <Text>Social Wellness</Text>
                  <Badge color="cyan.7">Well-Being</Badge>
                </Group>
                <Button variant="filled" radius="md" color="cyan.4">
                  Start Test
                </Button>
              </Card>
            </GridCol>
            <GridCol span={4}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <CardSection>
                  <Center>
                    <Image src="/dims/boy1.png" alt="Boy" w={227} />
                  </Center>
                </CardSection>
                <Group justify="space-between" mt={10} mb={10}>
                  <Text>Adolescent Wellness</Text>
                  <Badge color="cyan.7">Well-Being</Badge>
                </Group>
                <Button variant="filled" radius="md" color="cyan.4">
                  Start Test
                </Button>
              </Card>
            </GridCol>
          </Grid>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
