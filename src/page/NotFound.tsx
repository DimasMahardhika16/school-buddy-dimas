import { Button } from "@mantine/core";
import { useNavigate } from "react-router";

export default function TidakDitemukan404() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <div>
        <Button
          variant="filled"
          radius={"md"}
          ml={30}
          mt={40}
          onClick={handleBackToLogin}
        >
          Kembali ke Login
        </Button>
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
          background: "linear-gradient(to right, #00ffff, #ffffff)",
        }}
      >
        <h1>What are u looking for?</h1>
        <p>Sorry, the page u are looking doesn't exists</p>
      </div>
    </>
  );
}
