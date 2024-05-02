import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      navigate("/posts");
    } else {
      navigate("/signup");
    }
  }, []);

  return <div>Home page</div>;
}
