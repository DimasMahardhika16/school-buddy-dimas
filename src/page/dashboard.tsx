import { useEffect, useState } from "react";
import { MainDash } from "./components/MainDash";
import { useNavigate } from "react-router";
import type { UserData } from "./components/types/UserData";

export function DashboardPage() {
  const [getData, setGetData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    async function getDataBuddy() {
      const ambilData = localStorage.getItem("token") ?? "";
      if (!ambilData) {
        return;
      }
      try {
        const baseURL = "https://core-be.schoolbuddy.id/api/v2";
        const spesPart = "/point/user/getdetails";
        const finalURL = baseURL + spesPart;
        const res = await fetch(finalURL, {
          method: "GET",
          headers: {
            "User-Agent": "insomnia/9.2.0",
            Authorization: "Bearer " + ambilData,
          },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
          return;
        }

        const gotData = await res.json();
        setGetData(gotData.data);

        // ✅ Tambahkan ini
        if (gotData.data.role) {
          localStorage.setItem("role", gotData.data.role);
        }

        setIsLoading(false);
        console.log("Fetched buddy data");
      } catch (err) {
        console.log(err);
      }
    }
    getDataBuddy();
  }, []);

  if (isLoading) return <div>Loading dashboard...</div>;

  return (
    <>
      <MainDash data={getData} />
    </>
  );
}
