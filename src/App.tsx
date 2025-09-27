import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SelectionPage from "./pages/SelectionPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import TasksPage from "./pages/TasksPage";
import TaskCreatePage from "./pages/TaskCreatePage";
import ProjectCreatePage from "./pages/ProjectCreatePage";
import ProjectEditPage from "./pages/ProjectEditPage";

export default function App() {
  const { user, login, logout } = useAuth();

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={logout} />
      <Routes>
        {/* Default route: go to selection if logged in */}
        <Route
          path="/"
          element={user ? <SelectionPage /> : <Navigate to="/login" />}
        />

        <Route path="/login" element={<LoginPage onLogin={login} />} />

        {/* Selection decides where to go */}
        <Route
          path="/projects"
          element={user ? <ProjectsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/projects/:id"
          element={user ? <ProjectDetailPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/tasks/:id"
          element={user ? <TaskDetailPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/tasks"
          element={user ? <TasksPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/tasks/create"
          element={user ? <TaskCreatePage /> : <Navigate to="/login" />}
        />
      <Route
          path="/projects/create"
          element={user ? <ProjectCreatePage /> : <Navigate to="/login" />}
        />
        import ProjectEditPage from "./pages/ProjectEditPage"; // create this page

    <Route
      path="/projects/edit/:id"
      element={user ? <ProjectEditPage /> : <Navigate to="/login" />}
    />
          </Routes>
    </BrowserRouter>
  );
}
