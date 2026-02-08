import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard({ userId, onLogout }) {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Form states
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [topic, setTopic] = useState("");

  // Fetch problems
  const fetchProblems = async () => {
    const res = await fetch(`http://localhost:5000/problems/${userId}`);
    const data = await res.json();
    setProblems(data);
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  // Add or Update problem
const saveProblem = async () => {
  if (!title || !platform || !difficulty || !topic) {
    alert("Please fill all fields");
    return;
  }

  const url = editingId
    ? `http://localhost:5000/problems/${editingId}`
    : "http://localhost:5000/problems";

  const method = editingId ? "PUT" : "POST";

  const body = {
    user_id: userId,
    title,
    platform,
    difficulty,
    topic,
    solved_date: new Date().toISOString().split("T")[0]
  };

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    const updatedProblem = {
      id: Number(editingId),
      ...body
    };

    if (editingId) {
      // ✅ update problem in React state
      setProblems(problems.map(p =>
        p.id === Number(editingId) ? updatedProblem : p
      ));
    } else {
      // ✅ add new problem
      setProblems([...problems, updatedProblem]);
    }

    // reset form + states
    setTitle("");
    setPlatform("");
    setDifficulty("");
    setTopic("");
    setEditingId(null);
    setSelectedProblem(null);
  }
};


  // Delete
  const deleteProblem = async (id) => {
    if (!window.confirm("Delete this problem?")) return;

    await fetch(`http://localhost:5000/problems/${id}`, {
      method: "DELETE"
    });

    setProblems(problems.filter(p => p.id !== id));
  };

  // Edit
  const editProblem = (problem) => {
    setEditingId(problem.id);
    setTitle(problem.title);
    setPlatform(problem.platform);
    setDifficulty(problem.difficulty);
    setTopic(problem.topic);
  };

  return (
    <div className="dashboard-bg">
      <div className="dashboard-container">

        {/* Header */}
        <div className="top-bar">
          <div>
            <h1>My Coding Problems</h1>
            <p className="date-time">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </p>
          </div>

          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>

        {/* Grid */}
        <div className="grid">

          {/* Form */}
          <div className="glass-card">
            <h3>{editingId ? "Edit Problem" : "Add New Problem"}</h3>

            <input
              placeholder="Problem Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <select value={platform} onChange={e => setPlatform(e.target.value)}>
              <option value="">Select Platform</option>
              <option value="LeetCode">LeetCode</option>
              <option value="CodeChef">CodeChef</option>
              <option value="HackerRank">HackerRank</option>
            </select>

            <select
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
            >
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <input
              placeholder="Topic (Arrays, DP, etc.)"
              value={topic}
              onChange={e => setTopic(e.target.value)}
            />

            <button className="add-btn" onClick={saveProblem}>
              {editingId ? "Update Problem" : "Add Problem"}
            </button>
          </div>

          {/* Problem List */}
          <div className="glass-card">
            <h3>Problem List</h3>

            {problems.map(problem => (
              <div
                key={problem.id}
                className="problem-item"
                onClick={() => setSelectedProblem(problem)}
              >
                <span>{problem.title}</span>

                <div className="actions" onClick={e => e.stopPropagation()}>
                  <button
                    className="edit-btn"
                    onClick={() => editProblem(problem)}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteProblem(problem.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Modal */}
      {selectedProblem && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProblem(null)}
        >
          <div
            className="modal-card"
            onClick={e => e.stopPropagation()}
          >
            <h3>{selectedProblem.title}</h3>

            <p><b>Platform:</b> {selectedProblem.platform}</p>
            <p><b>Difficulty:</b> {selectedProblem.difficulty}</p>
            <p><b>Topic:</b> {selectedProblem.topic}</p>

            <button
              className="close-btn"
              onClick={() => setSelectedProblem(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;







