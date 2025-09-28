import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { CHARACTERS_QUERY } from "./graphql/queries";
import CharacterCell from "./components/characterCell";
import HeaderBar from "./components/headerBar";
import type {
  CharacterItem,
  CharactersInfo,
  CharactersQueryData,
  CharactersQueryVar,
} from "./graphql/types";

function App() {
  const [page, setPage] = useState<number>(1);  // Initialised page state to first page

  const { data, loading, error, refetch } = useQuery<CharactersQueryData, CharactersQueryVar>(
    CHARACTERS_QUERY,
    { variables: { page } }
  );

  const allCharacters: CharacterItem[] = data?.characters?.results ?? [];
  const info: CharactersInfo | null | undefined = data?.characters?.info;
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

      {!loading && !error && allCharacters.length === 0 && (
        <div className="p-4 bg-white rounded shadow text-gray-600">
          No characters found.
        </div>
      )}

      {/* Display Character Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allCharacters.map((c: CharacterItem) => <CharacterCell key={c.id} c={c} />)}
      </div>
    </div>
  );
}

export default App
