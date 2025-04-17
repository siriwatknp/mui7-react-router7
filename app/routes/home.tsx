import type { Route } from "./+types/home";
import { LoginForm } from "../components/LoginForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - React Router App" },
    { name: "description", content: "Sign in to your account" },
  ];
}

export default function Home() {
  return <LoginForm />;
}
