import { useState } from "react";
import { signUp } from "./services/handleAuth"

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signUp(email, password);
      setMessage(result.message);
    } catch (err) {
      setMessage(err.message || "Signup failed");
    }
  };

  return (
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
      {message && <p>{message}</p>}
    </form>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <SignUpForm />
    </div>
  );
}


