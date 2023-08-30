// gql is a tagged template literal, used for wrapping GraphQL strings like a schema definition.
// This converts GraphQL strings into the format that Apollo libraries expect when working with operations and schemas,
// and it also enables syntax highlighting.
const gql = require("graphql-tag");

const typeDefs = gql`
    type Query {
      "Get tracks array for homepage grid"
      tracksForHome: [Track!]!
    }
    
    "A track is a group of Modules that teaches about a specific topic"
    type Track {
      id: ID!
      title: String!
      author: Author!
      thumbnail: String
      length: Int
      modulesCount: Int
    }
    
    "Author of a complete Track or a Module"
    type Author {
      id: ID!
      name: String!
      photo: String
    }
`;

// We export the typeDefs to be used in the server.
module.exports = typeDefs;