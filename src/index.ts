import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import { importSchema } from "graphql-import";
import resolvers from "./resolvers";

const app = express();

const server = new ApolloServer({
  typeDefs: importSchema(`${__dirname}/typeDefs.graphql`),
  resolvers,
});

let port = process.env.PORT || 5000;
server.applyMiddleware({ app, path: "/" });

app.use("*", cors());

app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
