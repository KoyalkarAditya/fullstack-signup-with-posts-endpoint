import { jwtDecode } from "jwt-decode";

export function checkTokenExpiry() {
  const token = localStorage.getItem("jwtToken");

  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    const tokenExpiry = decodedToken.exp;

    if (tokenExpiry && currentTime >= tokenExpiry) {
      localStorage.removeItem("jwtToken");
    }
  }
}
