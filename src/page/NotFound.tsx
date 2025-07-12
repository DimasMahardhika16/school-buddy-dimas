import { Button } from "@mantine/core";
import { useNavigate } from "react-router";

export default function TidakDitemukan404() {
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleBack = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div>
        <Button
          variant="filled"
          radius={"md"}
          ml={30}
          mt={40}
          onClick={handleBack}
        >
          {isLoggedIn ? "Kembali ke Dashboard" : "Kembali ke Login"}
        </Button>
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
          background: "linear-gradient(to right, #00ffff, #ffffff)",
        }}
      >
        <h1>What are you looking for?</h1>
        <p>Sorry, the page you are looking doesn't exists</p>
        <img
          src="/img/404.svg"
          alt="404 Not Found"
          style={{ borderRadius: "50px", width: "20%", height: "30%" }}
        />
      </div>
    </>
  );
}
