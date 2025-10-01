import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";
import App from "../App";
import { GET_CHARACTERS } from "../graphql/queries";

// Refer mock https://www.apollographql.com/docs/react/development-testing/testing
// Define mock responses for graphQL queries 
const mockResponse = {
  request: {
    query: GET_CHARACTERS,
    variables: { page: 1 },
  },
  result: {
    data: {
      characters: {
        __typename: "Characters",
        info: { __typename: "Info", count: 3, pages: 2, next: 2, prev: null },
        results: [
          { __typename: 'Character', id: "1", name: "Rick Sanchez", species: "Human", image: "rick.png" },
          { __typename: 'Character', id: "2", name: "Morty Smith", species: "Human", image: "morty.png" },
        ],
      },
    },
  },
};

describe("Appollo Client App - GraphQL Test", () => {
  it("render loading then characters", async () => {
    render(
      <MockedProvider mocks={[mockResponse]}>
        <App />
      </MockedProvider>
    );

    // Test for loading state before resolving
    // use waitFor to check loading state prior data is loaded 
    await waitFor(() => {
      // use getByText to immediately look for element after rendering 
      expect(screen.getByText("Loading characters…")).toBeInTheDocument();
    });

    // Test on rendering characters
    // use findByText when elements appear after some delay (asynchronous action)
    expect(await screen.findByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
  });

  it("show error state", async () => {
    const mockError = {
      request: { query: GET_CHARACTERS, variables: { page: 1 } },
      error: new Error("GraphQL error")
    };

    render(
      <MockedProvider mocks={[mockError]}>
        <App />
      </MockedProvider>
    );

    // Error message should be present on UI
    expect(await screen.findByText(/GraphQL error/)).toBeInTheDocument();
  });

  it("show multiple error messages when GraphQL query returns combined list of error objects", async () => {
    const mockMultipleErrors = {
      request: { query: GET_CHARACTERS, variables: { page: 1 } },
      result: {
        errors: [
          { message: "First error message" },
          { message: "Second error message" }
        ]
      }
    };

    render(
      <MockedProvider mocks={[mockMultipleErrors]}>
        <App />
      </MockedProvider>
    );

    // Both error messages should be present on UI
    expect(await screen.findByText(/First error message/)).toBeInTheDocument();
    expect(screen.getByText(/Second error message/)).toBeInTheDocument();
  });

  it("show 'No characters found.' when API returns empty results", async () => {
    const mockEmpty = {
      request: {
        query: GET_CHARACTERS,
        variables: { page: 1 },
      },
      result: {
        data: {
          characters: {
            __typename: "Characters",
            info: { __typename: "Info", count: 0, pages: 1, next: null, prev: null },
            results: [],
          },
        },
      },
    };

    render(
      <MockedProvider mocks={[mockEmpty]}>
        <App />
      </MockedProvider>
    );

    expect(await screen.findByText("No characters found.")).toBeInTheDocument();
  });
});
