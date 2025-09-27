import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../apis/api";

export default function ProjectEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"not started" | "active" | "completed">("not started");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/project/${id}`);
        const project = res.data.project;
        setTitle(project.title);
        setDescription(project.description);
        setStatus(project.status);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await api.patch(`/project/${id}`, { title, description, status });
      navigate(`/projects/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update project");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project Title"
        className="border p-2 mb-2 w-full rounded"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
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
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update Project
      </button>
    </div>
  );
}
