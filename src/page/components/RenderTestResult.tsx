import { Image, Stack, Text } from "@mantine/core";
import type { TestResult } from "./types/UserData";

export function renderTestResult(test: TestResult) {
  switch (test.typeTest) {
    case "personality":
      return (
        <Stack gap={12}>
          {Object.entries(test.result.result).map(([domain, traits]) => {
            const imageName = `${domain.toLowerCase().replace(/\s/g, "_")}.png`;
            const imagePath = `/result/personality/${imageName}`;

            return (
              <Stack key={domain} gap={4}>
                <Image radius="md" src={imagePath} alt={domain} width={220} />
                <Text fw={600}>{domain}</Text>
                {Object.entries(traits).map(([trait, value]) => (
                  <Text key={trait} size="sm">
                    {trait}: {value.toFixed(2)}
                  </Text>
                ))}
              </Stack>
            );
          })}
        </Stack>
      );

    case "tpm":
      return (
        <Stack gap={12}>
          {Object.entries(test.result.result).map(([key, val]) => {
            const imageName = `${key.toLowerCase()}.png`;
            const imagePath = `/result/tpm/${imageName}`;

            return (
              <Stack key={key} gap={4}>
                <Image radius="md" src={imagePath} alt={key} width={220} />
                <Text size="sm">
                  {key.toUpperCase()}: {val}
                </Text>
              </Stack>
            );
          })}
          <Text fw={600}>Key: {test.result.key}</Text>
        </Stack>
      );

    case "ls":
      return (
        <Stack gap={4}>
          <Image radius="md" src="/result/ls/ar.png" />
          {Object.entries(test.result.result).map(([style, score]) => (
            <Text key={style} size="sm">
              {style}: {score}
            </Text>
          ))}
          <Text fw={600}>Key: {test.result.key}</Text>
        </Stack>
      );

    case "st":
      return (
        <Stack gap={4}>
          <Text size="sm">Depresi: {test.result.depresi}</Text>
          <Text size="sm">Kecemasan: {test.result.kecemasan}</Text>
          <Text size="sm">Stres: {test.result.stress}</Text>
        </Stack>
      );

    case "sw":
      return (
        <Stack gap={4}>
          <Text size="sm">Emotional: {test.result.emotional}</Text>
          <Text size="sm">Conduct Problem: {test.result.conductProblem}</Text>
          <Text size="sm">Hyperactivity: {test.result.hyperactivity}</Text>
          <Text size="sm">Peer Problem: {test.result.peerProlem}</Text>
          <Text size="sm">ProSocial: {test.result.proSocial}</Text>
        </Stack>
      );

    case "aw":
      return (
        <Stack gap={4}>
          {Object.entries(test.result).map(([k, v]) => (
            <Text key={k} size="sm">
              {k}: {v}
            </Text>
          ))}
        </Stack>
      );

    case "iq":
      return (
        <Stack gap={4}>
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
