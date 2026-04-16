import { render, screen } from "@testing-library/react";
import { Pagination } from "@/app/components/ui/Pagination";

describe("Pagination", () => {
  it("shows Next button when hasMore is true", () => {
    render(<Pagination hasMore={true} offset={0} limit={10} />);

    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("shows Prev button when offset > 0", () => {
    render(<Pagination hasMore={false} offset={10} limit={10} />);

    expect(screen.getByText("Prev")).toBeInTheDocument();
  });
});
