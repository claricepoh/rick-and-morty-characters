import { useState } from "react";
import { useQuery } from "@apollo/client/react";
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

  const { data, loading, error, dataState, refetch } = 
    useQuery<GetCharactersQuery, GetCharactersQueryVariables>(
      GET_CHARACTERS,
      { variables: { page } }
  );

  const allCharacters: Character[] = 
    (data?.characters?.results?.filter((c): c is Character => c !== null) ?? []);
  const info: Info | undefined | null = data?.characters?.info;
  const totalPages: number = info?.pages ?? 1;

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

  return (
    <div className="p-8">
      {/* Header bar with title + pagination */}
      <HeaderBar
        page={page}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
        onGoToPage={handleGoToPage}
      />

      {/* Handle Loading / Error / Empty states */}
      {loading && (
        <div className="p-4 bg-white rounded shadow text-gray-600">
          Loading characters…
        </div>
      )}

      {error && (
        <div className="p-4 bg-white rounded shadow text-red-600">
          Error loading characters: {error.message}
        </div>
      )}

      {!loading && !error && dataState === "empty" && (
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
