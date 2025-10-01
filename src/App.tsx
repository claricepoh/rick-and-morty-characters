import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { GET_CHARACTERS } from "./graphql/queries";
import CharacterCell from "./components/characterCell";
import HeaderBar from "./components/headerBar";
import type {
  GetCharactersQuery,
  GetCharactersQueryVariables,
  Info,
  Character
} from "./__generated__/types";

function App() {
  const [page, setPage] = useState<number>(1);  // Initialised page state to first page
  const [inputName, setInputName] = useState<string>("");  // search Name filter 
  const [debounceInputName, setDebouncedInputName] = useState<string>("");

  // Fetch GraphQL data
  const { data, loading, error, refetch } =
    useQuery<GetCharactersQuery, GetCharactersQueryVariables>(
      GET_CHARACTERS,
      { variables: { page, name: debounceInputName } }      // page variable paginated in 20 records by default 
  );

  const allCharacters: Character[] = 
    (data?.characters?.results?.filter((c): c is Character => c !== null) ?? []);
  const info: Info | undefined | null = data?.characters?.info;
  const totalPages: number = info?.pages ?? 1;

   // Error handling
  let errorMessage: string | null = null;
  if (error) {
    if (CombinedGraphQLErrors.is(error)) {
      errorMessage = error.errors.map((e) => e.message).join(" | ");
    } else {
      errorMessage = error.message;
    }
  }

  const handlePrev = () => {
    if (page > 1) {
      let pageNum: number = page - 1;
      setPage(pageNum);
      refetch();
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      let pageNum: number = page + 1;
      setPage(pageNum);
      refetch();
    }
  };

  const handleGoToPage = (targetPage: number) => {
    setPage(targetPage);
    refetch();
  }

  const handleSearch = (inputName: string) => {
    setInputName(inputName);
  }

  // Effect to handle the debouncing logic
  useEffect(() => {
    // Set a timer to update the debounced value after a delay
    const handleSearch = setTimeout(() => {
      setDebouncedInputName(inputName);
    }, 500); // 500ms debounce delay
    
    // Cleanup function: Clear the previous timer if inputValue changes before the delay
    return () => {
      clearTimeout(handleSearch);
    };
  }, [inputName]); // Re-run effect whenever inputValue changes

  return (
    <div className="p-8">
      {/* Header bar with title + pagination */}
      <HeaderBar
        page={page}
        totalPages={totalPages}
        inputName={inputName}
        onPrev={handlePrev}
        onNext={handleNext}
        onSearchName={handleSearch}
        onGoToPage={handleGoToPage}
      />

      {/* Handle Loading / Error / Empty states */}
      {loading && (
        <div className="p-4 bg-white rounded shadow text-gray-600">
          Loading characters…
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-white rounded shadow text-red-600">
          {errorMessage}
        </div>
      )}

      {!loading && !errorMessage && allCharacters.length === 0 && (
        <div className="p-4 bg-white rounded shadow text-gray-600">
          No characters found.
        </div>
      )}

      {/* Display Character Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allCharacters.map( c => <CharacterCell key={c?.id} c={c} />)}
      </div>
    </div>
  );
}

export default App
