import { LoginForm } from "./login-form";
import { config } from "@/config";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-void text-bone flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="text-xs tracking-[0.3em] lowercase text-bone/50 mb-10 text-center">
          {config.brandName} / admin
        </p>
        <h1 className="text-3xl text-bone mb-8 text-center">sign in</h1>
        <LoginForm />
      </div>
    </main>
  );
}
