import { render, screen } from "@testing-library/react";
import CharacterCell from "../components/characterCell";

describe("CharacterCell Component Test", () => {
  const character = {
    id: "1",
    name: "Rick Sanchez",
    species: "Human",
    image: "rick.png",
    episode: [],
  };

  it("render character name, species, and image", () => {
    render(<CharacterCell c={character} />);
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "rick.png");
  });

  it("renders 'Unknown' if species is missing", () => {
    render(<CharacterCell c={{ ...character, species: undefined }} />);
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });
});
