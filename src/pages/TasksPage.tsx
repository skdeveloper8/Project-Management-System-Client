import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../apis/api"; // your axios instance

type TaskType = {
  _id: string;
  title: string;
  status: string;
  projectId: string;
  createdBy: string;
  createdAt: string;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/task"); 
        setTasks(res.data.tasks || []); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">My Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <Link
            key={task._id}
            to={`/tasks/${task._id}`}
            className="p-4 border rounded shadow hover:shadow-lg transition block"
          >
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p>Status: {task.status}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
