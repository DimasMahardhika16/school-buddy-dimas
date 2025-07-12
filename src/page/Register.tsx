import {
  Container,
  Title,
  Text,
  Paper,
  TextInput,
  PasswordInput,
  NumberInput,
  Button,
  Select,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import classes from "../Loginpage.module.css";
import { useState } from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router";

export function RegistPage() {
  const [value, setValue] = useState<string | null>(null);
  const navigate = useNavigate();
  const [, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nohp: "",
    datadiri: {
      name: "",
      ttl: 0,
      gender: "",
      alamat: "",
    },
    orgname: "",
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      datadiri: {
        ...prev.datadiri,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    const ttlTimeStamp = value
      ? Math.floor(new Date(value).getTime() / 1000)
      : 0;

    const payload = {
      ...formData,
      datadiri: {
        ...formData.datadiri,
        ttl: ttlTimeStamp,
      },
    };

    try {
      const res = await fetch(
        "https://core-be.schoolbuddy.id/api/v2/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();
      alert("Registrasi Berhasil");
      console.log("Registrasi Berhasil:", result);
      localStorage.setItem("user", JSON.stringify(payload));
      setSubmitted(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.log("Gagal Registrasi:", err);
    }
  };

  return (
    <Container size={500} my={100} bg="cyan.4" pt={10} pb={20} bdrs={"md"}>
      <Title className={classes.title} ta={"center"} fw={"bold"} c={"white"}>
        Registrasi Form
      </Title>
      <Text className={classes.subtitle} fw={"normal"} c={"white"}>
        Silahkan Buat Akun Anda!
      </Text>
      <Button
        variant="filled"
        color="cyan.4"
        onClick={() => navigate("/login")}
      >
        <IconArrowLeft size={20} stroke={4} />
      </Button>

      <Paper withBorder shadow="sm" p={22} mt={10} radius={"md"}>
        <TextInput
          label="Username"
          placeholder="Masukkan Username"
          value={formData.username}
          onChange={(e) => handleChange("username", e.currentTarget.value)}
        />
        <TextInput
          label="Email"
          placeholder="Masukan Email@gmail.com"
          value={formData.email}
          onChange={(e) => handleChange("email", e.currentTarget.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Masukkan Password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.currentTarget.value)}
        />
        <NumberInput
          label="Nomor Handphone"
          placeholder="No HP"
          value={formData.nohp}
          onChange={(value) => handleChange("nohp", String(value))}
          w={150}
          mb={10}
        />

        <Text className={classes.subtitle} fw="normal" c="black">
          Data Pribadi
        </Text>
        <TextInput
          label="Nama Lengkap"
          placeholder="Masukkan Nama lengkap"
          value={formData.datadiri.name}
          onChange={(e) => handleNestedChange("name", e.currentTarget.value)}
        />
        <DatePickerInput
          label="Tanggal Lahir"
          placeholder="Pilih Tanggal Lahir"
          value={value}
          onChange={setValue}
          w={150}
        />
        <Select
          label="Jenis Kelamin"
          data={["Laki-laki", "Perempuan"]}
          value={formData.datadiri.gender}
          onChange={(value) => handleNestedChange("gender", value)}
          w={150}
        />
        <TextInput
          label="Alamat Tempat Tinggal"
          placeholder="Masukan Alamat"
          value={formData.datadiri.alamat}
          onChange={(e) => handleNestedChange("alamat", e.currentTarget.value)}
        />
        <TextInput
          label="Nama Organisasi"
          placeholder="Masukkan organisasi"
          value={formData.orgname}
          onChange={(e) => handleChange("orgname", e.currentTarget.value)}
        />
        <Button
          variant="filled"
          radius={"md"}
          color="cyan.4"
          mt={10}
          onClick={handleSubmit}
        >
          Daftar
        </Button>
      </Paper>
    </Container>
  );
}
