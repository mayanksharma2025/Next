import { getTasks } from "@/lib/tasks";
import { graphqlFetch } from "@/lib/graphql-client";

jest.mock("@/lib/graphql-client");

describe("getTasks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls graphqlFetch with correct variables", async () => {
    (graphqlFetch as jest.Mock).mockResolvedValue({
      tasks: {
        tasks: [],
        totalCount: 0,
        hasMore: false,
      },
    });

    await getTasks({
      limit: 10,
      offset: 0,
      search: "hello",
      status: "pending",
      priority: "low",
    });

    expect(graphqlFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        limit: 10,
        offset: 0,
        search: "hello",
        status: "pending",
        priority: "low",
      }),
    );
  });
});
