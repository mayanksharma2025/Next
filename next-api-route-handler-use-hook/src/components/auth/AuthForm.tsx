"use client";

import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

interface AuthFormProps {
  title: string;
  submitLabel: string;
  action: (formData: FormData) => Promise<void>; // ✅ FIXED
}

export function AuthForm({ title, submitLabel, action }: AuthFormProps) {
  const [loading, setLoading] = useState(false);

  return (
    <form
      action={async (formData) => {
        setLoading(true);
        try {
          await action(formData);
        } finally {
          setLoading(false);
        }
      }}
      className="w-full max-w-md rounded-lg bg-white p-6 shadow"
    >
      <h1 className="mb-6 text-2xl font-semibold text-center">{title}</h1>

      <div className="space-y-4">
        <Input name="email" placeholder="Email" required />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
      </div>

      <Button className="mt-6" disabled={loading}>
        {loading ? "Please wait..." : submitLabel}
      </Button>
    </form>
  );
}
