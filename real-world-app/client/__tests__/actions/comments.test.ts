import { graphqlFetch } from "@/lib/graphql-client";

jest.mock("@/lib/graphql-client");

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("Comments Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("adds a comment", async () => {
    const { revalidatePath } = require("next/cache");

    const addComment = async (taskId: string, content: string) => {
      await graphqlFetch("ADD_COMMENT", { taskId, content });
      revalidatePath(`/tasks/${taskId}`);
    };

    await addComment("1", "Hello");

    expect(graphqlFetch).toHaveBeenCalledWith("ADD_COMMENT", {
      taskId: "1",
      content: "Hello",
    });

    expect(revalidatePath).toHaveBeenCalledWith("/tasks/1");
  });

  it("updates a comment", async () => {
    const { revalidatePath } = require("next/cache");

    const updateComment = async (id: string, content: string) => {
      await graphqlFetch("UPDATE_COMMENT", { id, content });
      revalidatePath(`/tasks/1`);
    };

    await updateComment("c1", "Updated");

    expect(graphqlFetch).toHaveBeenCalledWith("UPDATE_COMMENT", {
      id: "c1",
      content: "Updated",
    });

    expect(revalidatePath).toHaveBeenCalled();
  });

  it("deletes a comment", async () => {
    const { revalidatePath } = require("next/cache");

    const deleteComment = async (id: string) => {
      await graphqlFetch("DELETE_COMMENT", { id });
      revalidatePath(`/tasks/1`);
    };

    await deleteComment("c1");

    expect(graphqlFetch).toHaveBeenCalledWith("DELETE_COMMENT", { id: "c1" });

    expect(revalidatePath).toHaveBeenCalled();
  });
});
