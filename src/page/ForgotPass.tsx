import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "../Loginpage.module.css";
import { useNavigate } from "react-router";

export function LupaPas() {
  const navigate = useNavigate();
  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <Container size={550} my={50} bg={"blue"} bdrs={"md"} pt={20} pb={20}>
      <Title className={classes.title} ta="center" c={"white"}>
        Lupa Kata Sandi?
      </Title>
      <Text c="white" fz="sm" ta="center" mt={15}>
        Masukkan Email Anda untuk mereset kata sandi anda{" "}
      </Text>

      <Paper withBorder shadow="md" p={30} radius={"md"} mt="xl">
        <TextInput
          label="Email Anda"
          placeholder="Masukkan saya12@gmail.com"
          required
        />
        <Group justify="space-between" mt="lg" className={classes.controls}>
          <Anchor
            className={classes.control}
            size="md"
            onClick={handleBackToLogin}
            component="button"
          >
            <Center inline>
              <IconArrowLeft size={20} stroke={1.5} />
              <Box w={200}>Kembali ke Halaman Masuk</Box>
            </Center>
          </Anchor>
          <Button className={classes.control} w={170}>
            Reset Kata Sandi
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}
