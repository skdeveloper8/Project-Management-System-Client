import { Link } from "react-router-dom";

type Props = {
  user: string | null;
  onLogout: () => void;
};

export default function Navbar({ user, onLogout }: Props) {
  return (
    <nav className="flex justify-between p-4 bg-blue-600 text-white">
      <Link to="/">Home</Link>
      {user ? (
        <button onClick={onLogout} className="bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
