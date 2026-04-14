import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { connectDB } from "../../../lib/db";
import { User } from "../../../models/User";
import { AuthForm } from "../../../components/auth/AuthForm";
import { auditLog } from "lib/audit";
import { Clientpage } from "components/auth/Clientpage";
import { Session } from "../../../models/Session";

export default function LoginPage() {
  async function submit(formData: FormData) {
    "use server"; // ✅ REQUIRED

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    // ✅ CREATE SESSION
    const sessionId = crypto.randomUUID();

    await Session.create({
      _id: sessionId,
      userId: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // ✅ AUDIT LOG
    const h = await headers();

    await auditLog({
      action: "USER_LOGIN",
      userId: user._id.toString(),
      role: user.role,
      ip: h.get("x-forwarded-for") ?? "unknown",
      userAgent: h.get("user-agent") ?? "unknown",
    });

    // ✅ SET COOKIE
    const cookieStore = await cookies();

    cookieStore.set("session", sessionId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      // maxAge: 10, // ✅ 10 seconds
    });

    // return redirect("/dashboard"); // ✅ return
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      {/* ✅ FIXED: use action instead of onSubmit */}
      <AuthForm title="Login Server" submitLabel="Sign In" action={submit} />

      <Clientpage />
    </main>
  );
}
