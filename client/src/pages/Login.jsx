import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      setError(error.response.data);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button type="submit">login</button>
    </form>
  );
}

export default Login;
