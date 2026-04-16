import { graphqlFetch } from "@/lib/graphql-client";

global.fetch = jest.fn();

describe("graphqlFetch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns data on success", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        data: { test: "ok" },
      }),
    });

    const result = await graphqlFetch<any>("QUERY");

    expect(result).toEqual({ test: "ok" });
  });

  it("throws error when graphql returns errors", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        errors: [{ message: "GraphQL error" }],
      }),
    });

    await expect(graphqlFetch("QUERY")).rejects.toThrow("GraphQL error");
  });

  it("throws when no data returned", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({}),
    });

    await expect(graphqlFetch("QUERY")).rejects.toThrow("No data returned");
  });
});
