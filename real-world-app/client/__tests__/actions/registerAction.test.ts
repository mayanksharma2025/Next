import { registerAction } from "@/app/(auth)/actions";
import { graphqlFetch } from "@/lib/graphql-client";

jest.mock("@/lib/graphql-client");

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("registerAction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("sets token and redirects after register", async () => {
    const mockSet = jest.fn();

    const { cookies } = require("next/headers");
    cookies.mockResolvedValue({
      set: mockSet,
    });

    (graphqlFetch as jest.Mock).mockResolvedValue({
      register: { token: "new-token" },
    });

    const formData = new FormData();
    formData.set("name", "John");
    formData.set("email", "john@test.com");
    formData.set("password", "123456");

    await registerAction(formData);

    expect(graphqlFetch).toHaveBeenCalled();

    expect(mockSet).toHaveBeenCalledWith(
      "token",
      "new-token",
      expect.any(Object),
    );
  });
});
