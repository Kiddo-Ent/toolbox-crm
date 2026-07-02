import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Sign In | ToolBox",
  description: "Secure login to ToolBox CRM",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-blue-100 px-6">

      <div className="w-full max-w-md">

        {/* Logo */}

        <div className="mb-10 text-center">

          <div className="mb-4 text-6xl">
            🧰
          </div>

          <h1 className="text-5xl font-bold text-slate-800">
            ToolBox
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Run Your Business
          </p>

        </div>

        {/* Login Card */}

        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-2xl">

          <LoginForm />

        </div>

        {/* Footer */}

        <div className="mt-8 text-center text-sm text-slate-500">

          ToolBox CRM Version 1.1

        </div>

      </div>

    </main>
  );
}