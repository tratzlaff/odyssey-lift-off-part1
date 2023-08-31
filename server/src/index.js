// The @apollo/server package is installed using 'npm install @apollo/server'
// From that package, we only need the named export ApolloServer.
const { ApolloServer } = require("@apollo/server");

const { startStandaloneServer } = require("@apollo/server/standalone");

// We import the typeDefs from our schema.js file.
const typeDefs = require("./schema");

// The following is needed to enable mocking.
// Install using 'npm install @graphql-tools/mock @graphql-tools/schema'
const { addMocksToSchema } = require("@graphql-tools/mock");
const { makeExecutableSchema } = require("@graphql-tools/schema");

// Contains functions that provide the mocked data we want the server to return for each queried field.
const mocks = {
    Query: () => ({
        tracksForHome: () => [...new Array(6)],
    }),
    Track: () => ({
        id: () => "track_01",
        title: () => "Astro Kitty, Space Explorer",
        author: () => {
            return {
                name: "Grumpy Cat",
                photo:
                    "https://res.cloudinary.com/dety84pbu/image/upload/v1606816219/kitty-veyron-sm_mctf3c.jpg",
            };
        },
        thumbnail: () =>
            "https://res.cloudinary.com/dety84pbu/image/upload/v1598465568/nebula_cat_djkt9r.jpg",
        length: () => 1210,
        modulesCount: () => 6,
    }),
};

async function startApolloServer() {
    // Create an instance of the ApolloServer class and pass it our typeDefs in its options object.
    // We're using shorthand property notation with implied keys, because we've named our constant with the matching key (typeDefs).
    // Instead of passing it the typeDefs directly, we'll be using the schema property.
    // This property is another way of initializing an Apollo Server, which is useful for building federated subgraphs
    // or if we're using functions like makeExecutableSchema (which we are!).
    // As the value of the schema property, we'll call the addMocksToSchema function and pass it an object.
    // This object defines its own schema property, and here we'll call the makeExecutableSchema function.
    // Then, we'll pass this function an object containing our typeDefs.
    // With this code, we're generating an executable schema from our typeDefs, and instructing Apollo Server to
    // populate every queried schema field with the provided mock data.
    const server = new ApolloServer({
        schema: addMocksToSchema({
            schema: makeExecutableSchema({ typeDefs }),
            mocks,
        }),
    });

    // Start the server.
    // The startStandaloneServer function returns a Promise, so we'll await the results of that call,
    // and pull out hte url property from the result.
    const { url } = await startStandaloneServer(server);

    console.log(`
        🚀  Server is running!
        📭  Query at ${url}
    `);
}

// Launch the server using 'npm run start' (make sure you're in the server/ folder).
startApolloServer()