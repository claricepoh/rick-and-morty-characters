import { gql } from "@apollo/client";

export const CHARACTERS_QUERY = gql`
  query Characters ($page: Int!) {
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