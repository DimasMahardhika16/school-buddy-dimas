import {
  ActionIcon,
  AppShell,
  Box,
  Button,
  Center,
  Divider,
  Group,
  Image,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
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
import { DatePickerInput } from "@mantine/dates";

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

export function AccountPage() {
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
              <IconCookie color="white" size={30} stroke={2} />
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
          <Title c="cyan.4" size={30}>
            My Profile
          </Title>
        </Box>

        <Group align="start" mx={50} mt="md" gap="lg" wrap="nowrap">
          {/* Form di kiri */}
          <Paper p="xl" shadow="sm" radius="md" w="50%" withBorder>
            <Title order={4} mt="sm" mb="sm">
              Edit Profile
            </Title>
            <form>
              <Stack gap="md">
                <TextInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  required
                />

                <Group grow>
                  <TextInput label="Username" placeholder="Username" required />
                  <TextInput
                    label="Email"
                    placeholder="Email address"
                    type="email"
                    required
                  />
                </Group>

                <DatePickerInput
                  label="Tanggal Lahir"
                  placeholder="Pick your birth date"
                  required
                  w={150}
                />

                <TextInput
                  label="Nomor Handphone"
                  placeholder="e.g. 08123456789"
                  required
                />

                <Group mt="md" justify="flex-end">
                  <Button variant="default">Cancel</Button>
                  <Button color="cyan.4">Save Changes</Button>
                </Group>
              </Stack>
            </form>

            <Divider mt={30} />

            {/* Reset Password Form */}
            <Title order={4} mt="xl" mb="sm">
              Reset Password
            </Title>
            <form>
              <Stack gap="md">
                <PasswordInput
                  label="New Password"
                  placeholder="Enter new password"
                  required
                />
                <PasswordInput
                  label="Confirm Password"
                  placeholder="Confirm new password"
                  required
                />
                <Group mt="md" justify="flex-end">
                  <Button variant="default">Cancel</Button>
                  <Button color="cyan.4">Save Changes</Button>
                </Group>
              </Stack>
            </form>
          </Paper>

          {/* Gambar di kanan */}
          <Box w="40%">
            <Image
              src="/dims/miyuki.png"
              alt="Mahouka"
              radius="md"
              fit="contain"
            />
          </Box>
        </Group>
      </AppShell.Main>
    </AppShell>
  );
}
