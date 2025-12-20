import { useState } from "react";
import { signUp, login } from "./services/handleAuth"
import './index.css'

function SignUpForm({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
        {message && <p style={{ color: message.includes("error") || message.includes("required") || message.includes("failed") || message.includes("invalid") || message.includes("wrong") ? "red" : "green" }}>{message}</p>}
      </form>
      <p>Already have an account? <button onClick={onSwitch}>Login</button></p>
    </div>
  );
}

function LoginForm({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
        {message && <p style={{ color: message.includes("error") || message.includes("required") || message.includes("failed") || message.includes("invalid") || message.includes("wrong") ? "red" : "green" }}>{message}</p>}
      </form>
      <p>Don't have an account? <button onClick={onSwitch}>Sign Up</button></p>
    </div>
  );
}

export default function MyApp() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <h1>Welcome to my app</h1>
      {isLogin ? (
        <LoginForm onSwitch={() => setIsLogin(false)} />
      ) : (
        <SignUpForm onSwitch={() => setIsLogin(true)} />
      )}
    </div>
  );
}


