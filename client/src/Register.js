import { useState } from "react";
import "./Login.css";

function Register({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Account created successfully! Please login.");
      onSwitch();
    } else {
      alert(data.message || "Registration failed");
    }
  };

  return (
    <div
      className="login-bg"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10,12,20,0.85), rgba(10,12,20,0.85)), url(/bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="login-wrapper">
        {/* WEBSITE NAME */}
        <div className="site-branding">
          <h1>CodeTrack</h1>
          <p>Track your coding journey</p>
        </div>

        <div className="login-card">
          <img src="/logoo.png" alt="Website Logo" className="login-logo" />

          <h2 className="welcome-text">Create Account</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button className="login-btn" onClick={handleRegister}>
            Register
          </button>

          <p className="register-text" onClick={onSwitch}>
            <span className="register-muted">Already have an account?</span>{" "}
            <span className="register-link">Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

