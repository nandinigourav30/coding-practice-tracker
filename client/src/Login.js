import { useState } from "react";
import "./Login.css";


function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      onLogin(data.userId);
    } else {
      alert(data.message || "Login failed");
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

      {/* WEBSITE NAME */}
    <div className="site-branding">
      <h1>CodeTrack</h1>
      <p>Track your coding journey</p>
    </div>
      <div className="login-card">
        <img src="/logoo.png" alt="Website Logo" className="login-logo" />


        <h2 className="welcome-text">Welcome Back</h2>


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

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
        <p
  style={{
    marginTop: "16px",
    textAlign: "center",
    fontSize: "14px",
    opacity: 0.8,
    cursor: "pointer"
  }}
   className="register-text" onClick={onSwitch}>
  <span className="register-muted">Don’t have an account?</span>{" "}
  <span className="register-link">Register</span>
</p>


      </div>
    </div>
  );
}

export default Login;


