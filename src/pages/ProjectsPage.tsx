import { useState } from "react";
import { useProjects } from "../hooks/useProjects";
import { useNavigate } from "react-router-dom";
import api from "../apis/api";
import { PencilIcon} from "@heroicons/react/24/solid"; 

export default function ProjectsPage() {
  const { projects, loading, fetchProjects } = useProjects();
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    if (!selectedIds.length) return alert("Select at least one project");
    if (!confirm("Are you sure you want to delete selected projects?")) return;

    try {
      setDeleting(true);
      await api.delete("/project", { data: { ids: selectedIds } });
      setSelectedIds([]);
      fetchProjects(); // refresh projects list
    } catch (err) {
      console.error(err);
      alert("Failed to delete projects");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Projects</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/projects/create")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Project
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting || !selectedIds.length}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete Selected"}
          </button>
        </div>
      </div>

      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">
              <input
                type="checkbox"
                checked={selectedIds.length === projects.length && projects.length > 0}
                onChange={(e) =>
                  setSelectedIds(e.target.checked ? projects.map((p) => p._id) : [])
                }
              />
            </th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Created By</th>
            <th className="border px-4 py-2">Created At</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // sort by createdAt desc
            .map((project) => (
              <tr
                key={project._id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/projects/${project._id}`)}
              >
                <td className="border px-4 py-2" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(project._id)}
                    onChange={() => toggleSelect(project._id)}
                  />
                </td>
                <td className="border px-4 py-2">{project.title}</td>
                <td className="border px-4 py-2">{project.description}</td>
                <td className="border px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      project.status === "not started"
                        ? "bg-gray-200 text-gray-800"
                        : project.status === "active"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {project.status.toUpperCase()}
                  </span>
                </td>
                <td className="border px-4 py-2">{project.createdBy}</td>
                <td className="border px-4 py-2">
                  {new Date(project.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2 flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => navigate(`/projects/edit/${project._id}`)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit Project"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
