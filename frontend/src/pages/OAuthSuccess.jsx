import { useEffect } from "react";
import GoogleButton from "./GoogleButton";

function OAuthSuccess() {
  useEffect(() => {
    const token = new URLSearchParams(
      window.location.search
    ).get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/dashboard";
    }
  }, []);

  return (
    <>
      <p>Logging you in...</p>
      <GoogleButton />
    </>
  );
}

export default OAuthSuccess;
