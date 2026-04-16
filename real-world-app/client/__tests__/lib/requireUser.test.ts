import { requireUser } from "@/lib/require-user";
import { graphqlFetch } from "@/lib/graphql-client";

jest.mock("@/lib/graphql-client");

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("requireUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns user when authenticated", async () => {
    (graphqlFetch as jest.Mock).mockResolvedValue({
      me: {
        id: "1",
        name: "Test",
        email: "test@test.com",
        role: "USER",
      },
    });

    const user = await requireUser();

    expect(user).toEqual(
      expect.objectContaining({
        id: "1",
        email: "test@test.com",
      }),
    );
  });

  it("redirects when user is null", async () => {
    const { redirect } = require("next/navigation");

    (graphqlFetch as jest.Mock).mockResolvedValue({
      me: null,
    });

    await requireUser();

    expect(redirect).toHaveBeenCalledWith("/login");
  });

  it("redirects when graphql throws error", async () => {
    const { redirect } = require("next/navigation");

    (graphqlFetch as jest.Mock).mockRejectedValue(new Error("Unauthorized"));

    await requireUser();

    expect(redirect).toHaveBeenCalledWith("/login");
  });
});
