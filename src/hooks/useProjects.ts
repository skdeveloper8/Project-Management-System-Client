import { useState, useEffect } from "react";
import api from "../apis/api";

export interface Project {
  _id: string;
  title: string;
  description: string;
  status: "not started" | "active" | "completed";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res: { data: { projects: Project[] } } = await api.get("/project");
      setProjects(res.data.projects);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, fetchProjects };
}
