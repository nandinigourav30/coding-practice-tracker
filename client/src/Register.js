import { useState } from "react";
import "./Login.css"; // reuse same glassmorphism styles

function Register({ onRegister }) {
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
      alert("Registration successful. Please login.");
      onRegister(); // switch to login
    } else {
      alert(data.message || "Registration failed");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2>Create Account</h2>

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

        <p
          style={{
            marginTop: "16px",
            textAlign: "center",
            fontSize: "14px",
            opacity: 0.8,
            cursor: "pointer"
          }}
          onClick={onRegister}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;
