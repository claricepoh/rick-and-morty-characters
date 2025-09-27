import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { CHARACTERS_QUERY } from "./graphql/queries";
import CharacterCell from "./components/characterCell";
import type {
  CharacterItem,
  //CharactersInfo,
  CharactersQueryData,
  CharactersQueryVar,
} from "./graphql/types";

function App() {
  const [page] = useState<number>(1);

  const { data, loading, error } = useQuery<CharactersQueryData, CharactersQueryVar>(
    CHARACTERS_QUERY,
    { variables: { page } }
  );

  const allCharacters: CharacterItem[] = data?.characters?.results ?? [];

  console.log (data);
  console.log (allCharacters);

  return (
    <div className="p-8">  {/* centered, responsive content container */}
      <h1 className="text-2xl font-semibold mb-6">The Ricky and Morty Characters</h1>

      {loading && <div className="status">Loading characters...</div>}
      {error && <div className="status error">Error loading characters: {error.message}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allCharacters.map((c: CharacterItem) => <CharacterCell key={c.id} c={c} />)}
      </div>
    </div>
  );
}

export default App
