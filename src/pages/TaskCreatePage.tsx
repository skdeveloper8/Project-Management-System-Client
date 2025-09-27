import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import api from "../apis/api";

export default function TaskCreatePage() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId") || "";
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<"todo" | "in-progress" | "done">("todo");

  const handleCreateTask = async () => {
    if (!title) return alert("Task title is required");

    try {
      await api.post("/task", { projectId, title, description, dueDate, status });
      navigate(`/projects/${projectId}`); // redirect back to project
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Task</h1>

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

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border p-2 mb-2 w-full rounded"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as "todo" | "in-progress" | "done")}
        className="border p-2 mb-4 w-full rounded"
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <button
        onClick={handleCreateTask}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Task
      </button>
    </div>
  );
}
