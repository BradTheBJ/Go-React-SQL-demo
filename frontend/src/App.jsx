import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import WelcomeScreen from "./components/Welcome";
import './index.css';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<WelcomeScreen />} />
      </Routes>
    </div>
  );
}


