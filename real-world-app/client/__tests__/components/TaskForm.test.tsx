import { render, screen, fireEvent } from "@testing-library/react";
import { TaskForm } from "@/app/components/ui/TaskForm";

describe("TaskForm", () => {
  it("renders form fields", () => {
    render(<TaskForm onSubmit={jest.fn()} />);

    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("submits form", () => {
    const mockSubmit = jest.fn();

    render(<TaskForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "My Task" },
    });

    fireEvent.click(screen.getByText("Save"));

    expect(mockSubmit).toHaveBeenCalled();
  });
});
