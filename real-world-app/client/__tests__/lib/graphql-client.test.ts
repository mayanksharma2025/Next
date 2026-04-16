// ✅ SET ENV FIRST (before import)
process.env.NEXT_PUBLIC_API_URL = "http://localhost:4000/graphql";

import { graphqlFetch } from "@/lib/graphql-client";

global.fetch = jest.fn();

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

describe("graphqlFetch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function mockCookies(token?: string) {
    const { cookies } = require("next/headers");

    cookies.mockResolvedValue({
      get: jest.fn(() => (token ? { value: token } : undefined)),
    });
  }

  it("returns data on success", async () => {
    mockCookies();

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        data: { test: "ok" },
      }),
    });

    const result = await graphqlFetch<any>("QUERY");

    expect(result).toEqual({ test: "ok" });
  });

  it("throws error when graphql returns errors", async () => {
    mockCookies();

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        errors: [{ message: "GraphQL error" }],
      }),
    });

    await expect(graphqlFetch("QUERY")).rejects.toThrow("GraphQL error");
  });

  it("throws when no data returned", async () => {
    mockCookies();

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({}),
    });

    await expect(graphqlFetch("QUERY")).rejects.toThrow("No data returned");
  });

  it("sends Authorization header when token exists", async () => {
    mockCookies("my-token");

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        data: { ok: true },
      }),
    });

    await graphqlFetch("QUERY");

    const call = (fetch as jest.Mock).mock.calls[0];
    const url = call[0];
    const options = call[1];

    expect(url).toBe("http://localhost:4000/graphql");

    expect(options.headers).toMatchObject({
      Authorization: "Bearer my-token",
    });
  });
});
