import { render, screen, fireEvent } from "@testing-library/react";
import HeaderBar from "../components/headerBar";
import { vi } from "vitest";

const setup = (props = {}) => {
  const defaultProps = {
    page: 1,
    totalPages: 6,
    onPrev: vi.fn(),
    onNext: vi.fn(),
    onGoToPage: vi.fn(),
    ...props,
  };
  render(<HeaderBar {...defaultProps} />);
  return defaultProps;
};


describe("HeaderBar Component Test", () => {
  it("render title and page info", () => {
    setup({ page: 2, totalPages: 10 });
    expect(screen.getByText(/The Rick and Morty Characters/i)).toBeInTheDocument();
    expect(screen.getByText(/Page 2 \/ 10/)).toBeInTheDocument();
  });

  it("call onPrev when <Prev> button is clicked", () => {
    const { onPrev } = setup({ page: 2 });
    fireEvent.click(screen.getByText(/Prev/i));
    expect(onPrev).toHaveBeenCalled();
  });

  it("call onNext when <Next> button is clicked", () => {
    const { onNext } = setup({ page: 2 });
    fireEvent.click(screen.getByText(/Next/i));
    expect(onNext).toHaveBeenCalled();
  });

  it("disable <Prev> button on first page", () => {
    setup({ page: 1 });
    expect(screen.getByText(/Prev/i)).toBeDisabled();
  });

  it("disable <Next> button on last page", () => {
    setup({ page: 6, totalPages: 6 });
    expect(screen.getByText(/Next/i)).toBeDisabled();
  });

  it("call onGoToPage with valid page when <Go> button is clicked", () => {
    const { onGoToPage } = setup({ page: 1, totalPages: 5 });
    const input = screen.getByPlaceholderText("1 - 5");
    fireEvent.change(input, { target: { value: "3" } });
    fireEvent.click(screen.getByText(/Go/i));
    expect(onGoToPage).toHaveBeenCalledWith(3);
  });

  it("show alert if <Go> button is clicked with invalid page", () => {
    window.alert = vi.fn();
    setup({ page: 1, totalPages: 5 });
    const input = screen.getByPlaceholderText("1 - 5");
    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.click(screen.getByText(/Go/i));
    expect(window.alert).toHaveBeenCalledWith("Please enter page number between 1 and 5");
  });
});
