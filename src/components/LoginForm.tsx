import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apis/api";

type Props = {
  onLogin: (email: string, password: string) => Promise<boolean>;
};

export default function AuthForm({ onLogin }: Props) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const success = await onLogin(email, password);
    if (!success) setError("Invalid credentials");
    else navigate("/"); // redirect to selection page
  };

  const handleRegister = async () => {
    try {
      const res = await api.post("/user/register", { name, email, password });
      alert(res.data.message);
      setIsRegister(false); 
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (isRegister) handleRegister();
    else handleLogin();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 p-6 shadow-lg rounded bg-white"
    >
      <h2 className="text-xl mb-4">{isRegister ? "Register" : "Login"}</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {isRegister && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full p-2 mb-4"
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border w-full p-2 mb-4"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border w-full p-2 mb-4"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-2"
      >
        {isRegister ? "Register" : "Login"}
      </button>

      <p className="text-center text-sm">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Login" : "Register"}
        </span>
      </p>
    </form>
  );
}
