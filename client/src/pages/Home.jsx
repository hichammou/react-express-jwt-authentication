import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Home() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };
  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default Home;
