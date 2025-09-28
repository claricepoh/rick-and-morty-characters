import { gql } from "@apollo/client";
import type { TypedDocumentNode } from "@apollo/client/";
import type {
  GetCharactersQuery,
  GetCharactersQueryVariables
} from "../__generated__/types";

export const GET_CHARACTERS: TypedDocumentNode<
  GetCharactersQuery,
  GetCharactersQueryVariables
> = gql`
  query GetCharacters ($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        species
        image
      }
    }
  }
`;