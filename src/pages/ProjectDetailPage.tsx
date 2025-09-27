import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../apis/api";

type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
};

type Project = {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
};

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/project/${id}`);
        setProject(res.data.project);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <div className="p-4">
      {/* Project Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <button
          onClick={() => navigate(`/tasks/create?projectId=${project._id}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>

      {/* Project Details */}
      <div className="mb-6 p-4 border rounded bg-gray-50">
        <p className="mb-2"><strong>Description:</strong> {project.description}</p>
        <p className="mb-2"><strong>Status:</strong> {project.status.toUpperCase()}</p>
        <p className="mb-2"><strong>Created By:</strong> {project.createdBy}</p>
        <p className="mb-2">
          <strong>Created At:</strong>{" "}
          {new Date(project.createdAt).toLocaleDateString()}
        </p>
        <p className="mb-2">
          <strong>Updated At:</strong>{" "}
          {new Date(project.updatedAt).toLocaleDateString()}
        </p>
        <p><strong>Total Tasks:</strong> {project.tasks.length}</p>
      </div>

      {/* Tasks Listing */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Tasks</h2>
        <ul className="space-y-2">
          {project.tasks.map((task) => (
            <li
              key={task._id}
              className="p-2 border rounded hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/tasks/${task._id}`)}
            >
              <div className="flex justify-between">
                <span className="font-semibold">{task.title}</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    task.status === "todo"
                      ? "bg-gray-200 text-gray-800"
                      : task.status === "in-progress"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {task.status.toUpperCase()}
                </span>
              </div>
              {task.description && <p className="text-gray-600">{task.description}</p>}
              {task.dueDate && (
                <p className="text-sm text-gray-500">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
