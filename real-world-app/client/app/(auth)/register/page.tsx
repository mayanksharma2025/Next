import { registerAction } from "../actions";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        action={registerAction}
        className="w-full max-w-md space-y-4 bg-white p-6 rounded-2xl shadow"
      >
        <h1 className="text-2xl font-semibold">Register</h1>

        <input
          name="name"
          placeholder="Name"
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full border p-2 rounded"
        />

        <button className="w-full bg-black text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
