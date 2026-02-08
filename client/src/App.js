import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";

function App() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (id) => {
    localStorage.setItem("userId", id);
    setUserId(id);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUserId(null);
  };

  if (userId) {
    return <Dashboard userId={userId} onLogout={handleLogout} />;
  }

  return showRegister ? (
    <Register onRegister={() => setShowRegister(false)} />
  ) : (
    <Login onLogin={handleLogin} onSwitch={() => setShowRegister(true)} />
  );
}

export default App;




