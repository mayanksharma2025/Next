import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export async function graphqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json: GraphQLResponse<T> = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  if (!json.data) {
    throw new Error("No data returned");
  }

  return json.data;
}
