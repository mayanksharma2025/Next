import { redirect } from "next/navigation";
import { AuthForm } from "../../../components/auth/AuthForm";
import { registerUser } from "lib/services/auth.service";

export default function RegisterPage() {
  async function submit(formData: FormData) {
    "use server";

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    await registerUser(email, password);

    redirect("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      {/* ✅ use action instead of onSubmit */}
      <AuthForm title="Create Account" submitLabel="Register" action={submit} />
    </main>
  );
}
