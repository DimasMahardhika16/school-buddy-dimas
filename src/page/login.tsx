import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import classes from "../Loginpage.module.css";
import { useNavigate } from "react-router";

export function LoginPage() {
  const [umail, setUmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://core-be.schoolbuddy.id/api/v2/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ umail, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Berhasil Masuk");
        navigate("/dashboard");
      } else {
        alert("Gagal Masuk" + data.message);
        console.log("Login Gagal:", data);
      }
    } catch (err) {
      alert("Terjadi gagal koneksi");
      console.log(err);
    }
  };

  return (
    <Container size={420} my={100} bg={"blue"} pb={10} pt={10} bdrs={"md"}>
      <Title ta={"center"} className={classes.title} fw={"bold"}>
        Halo Buddiers!
      </Title>

      <Text className={classes.subtitle} c={"black"}>
        Belum memiliki akun?{" "}
        <Anchor c={"white"} href="/register">
          Daftar Sekarang
        </Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius={"md"}>
        <form onSubmit={handleLogin}>
          <TextInput
            label="Username atau Email"
            placeholder="Masukkan Username atau Email"
            required
            radius={"md"}
            value={umail}
            onChange={(e) => setUmail(e.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Masukkan Password"
            required
            mt={"md"}
            radius={"md"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Group justify="space-between" mt={"lg"}>
            <Checkbox label="Ingat Saya" />
            <Anchor href="/forgotpassword" size="sm">
              Lupa Password?
            </Anchor>
          </Group>
          <Button
            variant="filled"
            radius="md"
            color="blue"
            mt={"lg"}
            fullWidth
            type="submit"
          >
            Masuk
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
