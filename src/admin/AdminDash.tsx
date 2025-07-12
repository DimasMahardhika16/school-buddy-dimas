import {
  ActionIcon,
  AppShell,
  Box,
  Button,
  Center,
  Flex,
  Menu,
  NativeSelect,
  Progress,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import {
  IconCookie,
  IconEye,
  IconGauge,
  IconKey,
  IconLogout,
  IconDotsVertical,
  IconEdit,
  IconTrash,
  IconUserSearch,
} from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import classes from "./navbaradmin.module.css";

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

const mockdata = [{ icon: IconGauge, label: "Dashboard" }];

const userData = [
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "08123456789",
    progress: 80,
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "08561234123",
    progress: 60,
  },
  {
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "08213456789",
    progress: 95,
  },
];

export function AdminDashboard() {
  const [active, setActive] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearch = () => {
    console.log("Find user", searchTerm);
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
        <Box mt={40} mx={30}>
          <Title size={30} c="cyan.4">
            Admin Dashboard
          </Title>
        </Box>

        <Flex justify="space-between" align="end" mx={30} mt={10}>
          <TextInput
            variant="filled"
            label="Search User"
            placeholder="User Name"
            w={250}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            rightSectionPointerEvents="auto"
            rightSection={
              <ActionIcon variant="light" color="cyan.4" onClick={handleSearch}>
                <IconUserSearch size={18} />
              </ActionIcon>
            }
          />
          <Flex align="end" gap="sm" mx={60}>
            <Button variant="filled" color="cyan.4" radius="md">
              Add User
            </Button>
            <NativeSelect
              label="Page Row"
              w={100}
              data={["50", "100", "200", "500", "1000"]}
            />
          </Flex>
        </Flex>

        <ScrollArea mt={40}>
          <Table
            withTableBorder
            withRowBorders
            striped
            highlightOnHover
            horizontalSpacing="md"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>User</Table.Th>
                <Table.Th>Progress Test</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Phone</Table.Th>
                <Table.Th align="center">Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {userData.map((user, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{user.name}</Table.Td>
                  <Table.Td>
                    <Progress
                      value={user.progress}
                      striped
                      animated
                      radius="xl"
                    />
                    <Text size="xs" mt={4}>
                      {user.progress}%
                    </Text>
                  </Table.Td>
                  <Table.Td>{user.email}</Table.Td>
                  <Table.Td>{user.phone}</Table.Td>
                  <Table.Td>
                    <Flex justify="center" gap="xs">
                      <Tooltip
                        label="View User Result"
                        position="top"
                        withArrow
                      >
                        <ActionIcon variant="light" color="cyan.4">
                          <IconEye size={18} />
                        </ActionIcon>
                      </Tooltip>

                      <Menu shadow="md" width={160} position="bottom-end">
                        <Menu.Target>
                          <ActionIcon variant="light" color="gray">
                            <IconDotsVertical size={18} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item>
                            <Flex align="center" gap="sm">
                              <IconEdit size={16} />
                              <span>Edit User</span>
                            </Flex>
                          </Menu.Item>
                          <Menu.Item>
                            <Flex align="center" gap="sm">
                              <IconKey size={16} />
                              <span>Reset Password</span>
                            </Flex>
                          </Menu.Item>
                          <Menu.Item color="red">
                            <Flex align="center" gap="sm">
                              <IconTrash size={16} />
                              <span>Delete User</span>
                            </Flex>
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Flex>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </AppShell.Main>
    </AppShell>
  );
}
