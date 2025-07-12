import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Image,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import classes from "../Loginpage.module.css";
import { useNavigate } from "react-router";
import { BackendURL } from "../constant/url";

// Optional: Decode token untuk ambil role jika tidak ada data.data.role
function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export function LoginPage() {
  const [umail, setUmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(BackendURL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ umail, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        localStorage.setItem("token", token);

        // Ambil role dari data API atau decode dari token
        const role =
          data?.data?.role?.toLowerCase() ??
          (parseJwt(token)?.isAdmin ? "admin" : "user");

        localStorage.setItem("role", role);

        alert("Berhasil Masuk");

        if (role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      } else {
        alert("Gagal Masuk: " + data.message);
      }
    } catch (err) {
      alert("Terjadi gagal koneksi");
    }
  };

  return (
    <Container
      size={420}
      my={100}
      pb={20}
      pt={10}
      bdrs={"md"}
      bd={"3px solid cyan.4"}
    >
      <Image src="/logo/logoh.png" radius={"md"} width="50px" />
      <Title ta={"center"} className={classes.title} fw={"bold"} c="cyan.4">
        Halo Buddiers!
      </Title>

      <Text className={classes.subtitle} c={"black"}>
        Belum memiliki akun?{" "}
        <Anchor c="cyan.6" href="/register">
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
            <Anchor href="/forgotpassword" size="sm" c="cyan.6">
              Lupa Password?
            </Anchor>
          </Group>
          <Button
            variant="filled"
            radius="md"
            color="cyan.4"
            mt="lg"
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
