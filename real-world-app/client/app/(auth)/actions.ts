"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { graphqlFetch } from "@/lib/graphql-client";
import { LOGIN_MUTATION, REGISTER_MUTATION } from "@/lib/mutations";
import type { AuthPayload } from "@/types/auth";

type LoginResponse = { login: AuthPayload };
type RegisterResponse = { register: AuthPayload };

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const data = await graphqlFetch<LoginResponse>(LOGIN_MUTATION, {
    email,
    password,
  });

  (await cookies()).set("token", data.login.token, {
    httpOnly: true,
    path: "/",
  });

  redirect("/tasks");
}

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const data = await graphqlFetch<RegisterResponse>(REGISTER_MUTATION, {
    name,
    email,
    password,
  });

  (await cookies()).set("token", data.register.token, {
    httpOnly: true,
    path: "/",
  });

  redirect("/tasks");
}
