export interface UserData {
  _id: string;
  username: string;
  email: string;
  nohp: string;
  dataDiri: {
    name: string;
    ttl: number;
    gender: string;
    alamat: string;
  };
  testResult: TestResult[];
  org: {
    _id: string;
    name: string;
    address: string;
    userLimit: number;
    key: string;
    __v: number;
  };
  __v: number;
}

// Union dari semua kemungkinan tipe test
export type TestResult =
  | PersonalityTest
  | TpmTest
  | LsTest
  | StTest
  | SwTest
  | AwTest
  | IqTest;

// Struktur dasar semua test
interface BaseTest {
  _id: string;
  typeTest: string;
  date: number;
  __v: number;
}

// Personality Test
interface PersonalityTest extends BaseTest {
  typeTest: "personality";
  result: {
    result: {
      [domain: string]: { [trait: string]: number }; // e.g. Executing: { Achiever: 0.5 }
    };
    average: {
      [domain: string]: number;
    };
  };
}

// TPM (Holland) Test
interface TpmTest extends BaseTest {
  typeTest: "tpm";
  result: {
    result: {
      r: number;
      i: number;
      a: number;
      s: number;
      e: number;
      c: number;
    };
    key: string;
  };
}

// Learning Style (LS)
interface LsTest extends BaseTest {
  typeTest: "ls";
  result: {
    result: {
      visual: number;
      aural: number;
      readWrite: number;
      kinesthetic: number;
    };
    key: string;
  };
}

// Stress Test (ST)
interface StTest extends BaseTest {
  typeTest: "st";
  result: {
    depresi: number;
    kecemasan: number;
    stress: number;
  };
}

// Strength & Weakness (SW)
interface SwTest extends BaseTest {
  typeTest: "sw";
  result: {
    emotional: number;
    conductProblem: number;
    hyperactivity: number;
    peerProlem: number;
    proSocial: number;
  };
}

// Adolescent Wellness (AW)
interface AwTest extends BaseTest {
  typeTest: "aw";
  result: {
    Home: number;
    "Education/Employment": number;
    Activities: number;
    Drugs: number;
    Sexuality: number;
    "Suicide/Depression": number;
    Safety: number;
  };
}

// IQ Test
interface IqTest extends BaseTest {
  typeTest: "iq";
  result: {
    iq: number;
    details: {
      kecerdasanVerbal: number;
      kecerdasanAngka: number;
      kecerdasanFigural: number;
      kecerdasanMemori: number;
      berpikirKomprehensif: number;
      kemampuanAnalisis: number;
      pengambilanKeputusan: number;
      kemampuanBerbahasa: number;
    };
  };
}
