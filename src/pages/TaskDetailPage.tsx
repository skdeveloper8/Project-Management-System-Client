import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../apis/api"; // axios instance

type Task = {
  _id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  dueDate: string;
  projectId: string;
  createdBy: string;
};

export default function TaskDetailPage() {
  const { id } = useParams(); // taskId from route
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch task details
  useEffect(() => {
    if (!id) return;
    const fetchTask = async () => {
      try {
        const res = await api.get(`/task/${id}`);
        setTask(res.data?.task); // assuming API returns task object directly
      } catch (err) {
        console.error("Failed to fetch task:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleUpdate = async () => {
    if (!task) return;
    try {
      const res = await api.patch(`/task/${task._id}`, {
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
      });
      setTask(res.data?.task); // update UI
      alert("Task updated successfully!");
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!task) return <p>Task not found.</p>;

  return (
    <div className="max-w-xl mx-auto p-6 border rounded shadow">
      <button
        onClick={() => navigate(`/projects/${task.projectId}`)}
        className="mb-4 text-blue-600 underline"
      >
        ← Back to Project
      </button>

      <h1 className="text-2xl font-bold mb-4">Task Detail</h1>

      <div className="mb-4">
        <label className="block font-semibold">Title</label>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Description</label>
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Status</label>
        <select
          value={task.status}
          onChange={(e) =>
            setTask({ ...task, status: e.target.value as Task["status"] })
          }
          className="border p-2 w-full rounded"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Due Date</label>
        <input
          type="date"
          value={task?.dueDate?.split("T")[0]}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          className="border p-2 w-full rounded"
        />
      </div>

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update Task
      </button>
    </div>
  );
}
