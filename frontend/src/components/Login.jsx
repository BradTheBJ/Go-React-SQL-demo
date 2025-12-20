import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/handleAuth";
import '../index.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous message
    if (!email || !password) {
      setMessage("Email and password are required");
      return;
    }
    try {
      const result = await login(email, password);
      setMessage(result.message || "Login successful!");
    } catch (err) {
      setMessage(err.message || "Login failed");
    }
  };

  const getMessageColor = () => {
    if (message.includes("error") || message.includes("required") || 
        message.includes("failed") || message.includes("invalid") || 
        message.includes("wrong")) {
      return "red";
    }
    return "green";
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        /><br /><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        /><br /><br />
        <button type="submit">Login</button>
        {message && <p style={{ color: getMessageColor() }}>{message}</p>}
      </form>
      <p>Don't have an account? <button onClick={() => navigate("/signup")}>Sign Up</button></p>
    </div>
  );
}

