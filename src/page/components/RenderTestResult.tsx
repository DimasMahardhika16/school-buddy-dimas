import { Badge, Center, Image, Progress, Stack, Text } from "@mantine/core";
import type { TestResult } from "./types/UserData";

export function renderTestResult(test: TestResult) {
  switch (test.typeTest) {
    case "personality": {
      const personalityObject = test.result.result; // misalnya: { Executing: {Trait1: value, ...} }
      const personalityResult = Object.keys(personalityObject)[0]; // "Executing"
      const imageName =
        personalityResult.toLowerCase().replace(/\s/g, "_") + ".png";
      const imagePath = `/result/personality/${imageName}`;
      const description: Record<string, string> = {
        Executing: "Orang yang fokus pada aksi nyata dan penyelesaian tugas",
      };

      return (
        <Stack align="center" gap={12}>
          <Image radius="md" src={imagePath} alt={personalityResult} w={220} />
          <Text fw={700} size="xl">
            {personalityResult}
          </Text>
          <Text c="white" ml={5}>
            {description[personalityResult] ?? "Deskripsi tidak tersedia."}
          </Text>
        </Stack>
      );
    }

    case "tpm": {
      const riasKey = test.result.key
        .toUpperCase()
        .trim()
        .split("")
        .filter(Boolean);

      const riasDescriptions: Record<string, string> = {
        R: "Realistic: Suka pekerjaan yang bersifat praktis, fisik, atau teknis.",
        I: "Investigative: Menyukai analisis, observasi, dan penelitian.",
        A: "Artistic: Kreatif, ekspresif, dan menyukai seni.",
        S: "Social: Senang membantu dan bekerja dengan orang lain.",
        E: "Enterprising: Suka memimpin, menjual, dan mengambil risiko.",
        C: "Conventional: Terstruktur, rapi, dan menyukai keteraturan.",
      };

      const riasLabels: Record<string, string> = {
        R: "Realistic",
        I: "Investigative",
        A: "Artistic",
        S: "Social",
        E: "Enterprising",
        C: "Conventional",
      };

      return (
        <Stack align="center" gap={12}>
          {riasKey.map((key) => {
            const imageName = `${key.toLowerCase()}.png`;
            const imagePath = `/result/tpm/${imageName}`;
            const label = riasLabels[key];
            const description = riasDescriptions[key];

            return (
              <Stack key={key} gap={4} align="center">
                <Image
                  src={imagePath}
                  alt={label}
                  w={200}
                  style={{ borderRadius: "8px" }}
                  onError={() =>
                    console.error(`Gagal memuat gambar: ${imagePath}`)
                  }
                />
                <Text fw={700} size="lg">
                  {label}
                </Text>
                <Text size="sm">{description}</Text>
              </Stack>
            );
          })}
        </Stack>
      );
    }

    case "ls": {
      const key = test.result.key.toLowerCase().trim();

      const lsDescriptions: Record<string, string> = {
        v: "Visual: Belajar paling efektif melalui gambar, diagram, warna, dan tampilan visual lainnya.",
        a: "Aural: Belajar paling efektif dengan mendengarkan, seperti ceramah, diskusi, atau musik.",
        r: "Read/Write: Belajar dengan baik melalui teks tertulis seperti membaca dan menulis.",
        k: "Kinesthetic: Belajar paling efektif melalui pengalaman langsung, praktik, atau simulasi.",
      };

      const lsLabels: Record<string, string> = {
        v: "Visual",
        a: "Aural",
        r: "Read/Write",
        k: "Kinesthetic",
      };

      const imagePath = `/result/ls/${key}.png`;
      const label = lsLabels[key.toLowerCase()] ?? "Unknown";
      const description =
        lsDescriptions[key.toLowerCase()] ?? "Deskripsi tidak tersedia.";

      return (
        <Stack align="center" gap={12}>
          <Image radius="md" src={imagePath} alt={label} w={220} />
          <Text fw={700} size="lg">
            {label}
          </Text>
          <Text size="sm">{description}</Text>
        </Stack>
      );
    }

    case "st": {
      const { depresi, kecemasan, stress } = test.result;

      // Fungsi untuk memilih gambar berdasarkan tingkat skor
      const getLevel = (value: number) => {
        if (value < 30) return "low"; // Baik
        if (value < 60) return "medium"; // Cukup
        return "high"; // Tinggi / perlu perhatian
      };

      const statusLabels: Record<string, string> = {
        low: "Rendah (baik)",
        medium: "Sedang (perlu perhatian)",
        high: "Tinggi (perlu penanganan)",
      };

      const descriptionMap: Record<string, string> = {
        depresi:
          "Depresi mencerminkan suasana hati yang menurun, kehilangan minat, dan kelelahan emosional. Semakin tinggi nilainya, semakin besar kemungkinan individu mengalami tekanan emosional yang serius.",
        kecemasan:
          "Kecemasan menunjukkan tingkat ketegangan, kekhawatiran berlebih, dan rasa takut. Skor tinggi menunjukkan ketidaknyamanan psikologis yang signifikan.",
        stress:
          "Stres adalah respon terhadap tekanan lingkungan dan internal. Angka tinggi bisa menunjukkan kelelahan mental atau burnout.",
      };

      const renderSection = (label: string, value: number) => {
        const level = getLevel(value);
        const imagePath = `/assets/answer/${level}.png`;

        return (
          <Stack key={label} gap={6}>
            <Center>
              <Image
                src={imagePath}
                alt={`${label} ${level}`}
                radius="md"
                w={200}
              />
            </Center>
            <Text fw={600} size="sm" tt="capitalize">
              {label}: {value} ({statusLabels[level]})
            </Text>
            <Progress
              value={value}
              striped
              animated
              color={
                level === "high"
                  ? "red"
                  : level === "medium"
                  ? "yellow"
                  : "green"
              }
            />
            <Text size="xs" c="white">
              {descriptionMap[label]}
            </Text>
          </Stack>
        );
      };

      return (
        <Stack gap={24}>
          {renderSection("depresi", depresi)}
          {renderSection("kecemasan", kecemasan)}
          {renderSection("stress", stress)}
        </Stack>
      );
    }

    case "sw": {
      // Nilai kecil = Baik, besar = Buruk
      const getStatusColor = (value: number) => {
        if (value >= 7) return { color: "red", label: "Buruk" }; // 7-10
        if (value >= 4) return { color: "yellow", label: "Netral" }; // 4-6
        return { color: "green", label: "Baik" }; // 0-3
      };

      const swScores = [
        { label: "Emotional", value: test.result.emotional },
        { label: "Conduct Problem", value: test.result.conductProblem },
        { label: "Hyperactivity", value: test.result.hyperactivity },
        { label: "Peer Problem", value: test.result.peerProlem },
        { label: "ProSocial", value: test.result.proSocial },
      ];

      return (
        <Stack gap={16}>
          {swScores.map((score) => {
            const { color, label } = getStatusColor(score.value);
            return (
              <div key={score.label}>
                <Stack gap={4}>
                  <Text size="sm" fw={500}>
                    {score.label}
                  </Text>
                  <Progress
                    value={(score.value / 10) * 100}
                    color={color}
                    radius="md"
                    striped
                    animated
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Text size="xs" c="white">
                      Skor: {score.value} / 10
                    </Text>
                    <Badge color={color} size="xs" variant="light">
                      {label}
                    </Badge>
                  </div>
                </Stack>
              </div>
            );
          })}
        </Stack>
      );
    }

    case "aw": {
      const getStatusColor = (value: number) => {
        if (value >= 15) return { color: "red", label: "Buruk" };
        if (value >= 7) return { color: "yellow", label: "Netral" };
        return { color: "green", label: "Baik" };
      };

      return (
        <Stack gap={16}>
          {Object.entries(test.result).map(([key, value]) => {
            const numericValue =
              typeof value === "number" ? value : parseFloat(value as string);
            if (isNaN(numericValue)) return null;

            const { color, label } = getStatusColor(numericValue);

            return (
              <div key={key}>
                <Stack gap={4}>
                  <Text size="sm" fw={500}>
                    {key}
                  </Text>
                  <Progress
                    value={(numericValue / 20) * 100}
                    color={color}
                    radius="md"
                    striped
                    animated
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Text size="xs" c="white">
                      Skor: {numericValue} / 20
                    </Text>
                    <Badge color={color} size="xs" variant="light">
                      {label}
                    </Badge>
                  </div>
                </Stack>
              </div>
            );
          })}
        </Stack>
      );
    }

    case "iq":
      return (
        <Stack gap={4}>
          <Center>
            <Image src="/dims/bear.png" alt="Bear" w={100} />
          </Center>
          <Text fw={600}>IQ: {test.result.iq}</Text>
          {Object.entries(test.result.details).map(([key, value]) => (
            <Text key={key} size="sm">
              {key}: {value}
            </Text>
          ))}
        </Stack>
      );

    default:
      return <Text>Tipe tes tidak dikenali.</Text>;
  }
}
