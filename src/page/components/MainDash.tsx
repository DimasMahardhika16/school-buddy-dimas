import {
  AppShell,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Flex,
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

export function MainDash() {
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
      <AppShell.Main>
        <Box>
          <h1
            style={{ marginLeft: "50px", color: "blue", fontFamily: "inherit" }}
          >
            Welcome!
          </h1>
        </Box>
        <Box display={"flex"} my={40} w={500}>
          <Flex direction={"column"}>
            <Flex>
              <Title order={4} ml={60}>
                Dashboard
              </Title>
              <Badge variant="filled" radius={"sm"} ml={20}>
                New
              </Badge>
            </Flex>
            <Text ml={60}>Get some new information on HomePage</Text>
          </Flex>
        </Box>
        <Box w={500} h={200} ml={20}>
          <Card
            padding={90}
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
        <Box>
          <Card>Created Group</Card>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
