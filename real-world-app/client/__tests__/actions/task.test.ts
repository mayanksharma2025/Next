import { graphqlFetch } from "@/lib/graphql-client";

jest.mock("@/lib/graphql-client");

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Task Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates a task", async () => {
    const mockFormData = new FormData();
    mockFormData.set("title", "Test Task");
    mockFormData.set("description", "Test Desc");
    mockFormData.set("status", "pending");
    mockFormData.set("priority", "low");

    // simulate your server action logic inline
    const handleSubmit = async (formData: FormData) => {
      const input = {
        title: formData.get("title"),
        description: formData.get("description"),
        status: formData.get("status"),
        priority: formData.get("priority"),
      };

      await graphqlFetch("CREATE_TASK", { input });
    };

    await handleSubmit(mockFormData);

    expect(graphqlFetch).toHaveBeenCalledWith(
      "CREATE_TASK",
      expect.objectContaining({
        input: expect.objectContaining({
          title: "Test Task",
        }),
      }),
    );
  });

  it("updates a task", async () => {
    const mockFormData = new FormData();
    mockFormData.set("title", "Updated Task");

    const handleSubmit = async (formData: FormData) => {
      const input = {
        title: formData.get("title"),
      };

      await graphqlFetch("UPDATE_TASK", {
        id: "123",
        input,
      });
    };

    await handleSubmit(mockFormData);

    expect(graphqlFetch).toHaveBeenCalledWith(
      "UPDATE_TASK",
      expect.objectContaining({
        id: "123",
      }),
    );
  });

  it("deletes a task", async () => {
    await graphqlFetch("DELETE_TASK", { id: "123" });

    expect(graphqlFetch).toHaveBeenCalledWith("DELETE_TASK", { id: "123" });
  });
});
