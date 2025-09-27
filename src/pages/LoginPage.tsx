import LoginForm from "../components/LoginForm";

type Props = {
  onLogin: (email: string, password: string) => Promise<boolean>;
};

export default function LoginPage({ onLogin }: Props) {
  return <LoginForm onLogin={onLogin} />;
}
