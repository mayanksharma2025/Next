import { redirect } from "next/navigation";
import { graphqlFetch } from "./graphql-client";
import { ME_QUERY } from "./queries";
import type { User } from "@/types/auth";

type MeResponse = { me: User | null };

export async function requireUser(): Promise<User> {
  try {
    const data = await graphqlFetch<MeResponse>(ME_QUERY);

    if (!data.me) redirect("/login");

    return data.me;
  } catch {
    redirect("/login");
  }
}
