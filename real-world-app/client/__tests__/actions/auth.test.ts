import { loginAction } from "@/app/(auth)/actions";
import { graphqlFetch } from "@/lib/graphql-client";

jest.mock("@/lib/graphql-client");

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Auth Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("loginAction sets cookie and redirects", async () => {
    const mockSet = jest.fn();

    const cookiesMock = {
      set: mockSet,
    };

    const { cookies } = require("next/headers");
    cookies.mockResolvedValue(cookiesMock);

    (graphqlFetch as jest.Mock).mockResolvedValue({
      login: { token: "test-token" },
    });

    const formData = new FormData();
    formData.set("email", "test@test.com");
    formData.set("password", "123456");

    await loginAction(formData);

    expect(graphqlFetch).toHaveBeenCalled();
    expect(mockSet).toHaveBeenCalledWith(
      "token",
      "test-token",
      expect.any(Object),
    );
  });
});
