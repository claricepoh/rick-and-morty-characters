/* Interfaces for GraphQL response shapes */
/* Using interface makes it easy to extend types when queries evolve more fields later */

export interface CharacterItem {
  id: number;
  name: string;
  species: string;
  image: string;
}

export interface CharactersInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharactersQueryData {
  characters: {
    info: CharactersInfo | null;
    results: CharacterItem[] | null;
  } | null;
}

export interface CharactersQueryVar {
  page: number;
}