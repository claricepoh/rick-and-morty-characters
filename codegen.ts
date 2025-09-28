import { CodegenConfig } from "@graphql-codegen/cli";

// Command to run config file: npm run codegen
// Config to generate Typescript Types for GraphQL query response and variables
const config: CodegenConfig = {
  schema: "https://rickandmortyapi.com/graphql",
  // This assumes that all your source files are in a top-level `src/` directory - 
  // you might need to adjust this to your file structure
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql"
      }
    },
    "./src/__generated__/types.ts": {
      plugins: ["typescript", "typescript-operations"],
    }
  },
};

export default config;

