import { useLocation, useParams } from "react-router";

function capitalizeCityName(name: string) {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export default function ConsertsLists() {
  const { city } = useParams();
  const location = useLocation();

  const isTrending = location.pathname.endsWith("/trending");
  const formattedCity = city ? capitalizeCityName(city) : null;

  const title = isTrending
    ? "🔥Trending Conserts"
    : city
    ? `🎙️ Conserts in ${formattedCity}`
    : "Conserts";

  const dataSource = isTrending
    ? "api/conserts/trending"
    : city
    ? `api/conserts/city/${city}`
    : "api/conserts";

  return (
    <div>
      <h2>{title}</h2>
      <p>fetching from: {dataSource}</p>
    </div>
  );
}
