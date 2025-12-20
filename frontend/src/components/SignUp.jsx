import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/handleAuth";
import '../index.css';

export default function SignUp() {
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
      const result = await signUp(email, password);
      setMessage(result.message || "Signup successful!");
    } catch (err) {
      setMessage(err.message || "Signup failed");
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
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
        {message && <p style={{ color: getMessageColor() }}>{message}</p>}
      </form>
      <p>Already have an account? <button onClick={() => navigate("/login")}>Login</button></p>
    </div>
  );
}

