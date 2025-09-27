import { useNavigate } from "react-router-dom";

export default function SelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-2xl font-bold">What do you want to view?</h1>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/projects")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow"
        >
          Projects
        </button>

        <button
          onClick={() => navigate("/tasks")}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow"
        >
          Tasks
        </button>
      </div>
    </div>
  );
}
