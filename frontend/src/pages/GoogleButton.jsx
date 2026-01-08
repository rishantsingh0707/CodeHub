import axiosInstance from "../lib/axios";

export default function GoogleLoginButton() {
  return (
    <button
      onClick={() =>
        (window.location.href =
          "http://localhost:5000/auth/google")
      }
    >
      Login with Google
    </button>
  );
}
