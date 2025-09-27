import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apis/api";

export default function ProjectCreatePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"not started" | "active" | "completed">("not started");

  const handleCreateProject = async () => {
    if (!title) return alert("Project title is required");

    try {
      await api.post("/project", { title, description, status });
      navigate("/projects"); // back to project list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Project</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mb-2 w-full rounded"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mb-2 w-full rounded"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as "not started" | "active" | "completed")}
        className="border p-2 mb-4 w-full rounded"
      >
        <option value="not started">Not Started</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <button
        onClick={handleCreateProject}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Project
      </button>
    </div>
  );
}
