"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var apollo_server_express_1 = require("apollo-server-express");
var cors_1 = __importDefault(require("cors"));
var graphql_import_1 = require("graphql-import");
var resolvers_1 = __importDefault(require("./resolvers"));
var app = express_1.default();
var server = new apollo_server_express_1.ApolloServer({
    typeDefs: graphql_import_1.importSchema(__dirname + "/../typeDefs.graphql"),
    resolvers: resolvers_1.default,
});
var port = process.env.PORT || 5000;
server.applyMiddleware({ app: app, path: "/" });
app.use("*", cors_1.default());
app.listen({ port: port }, function () {
    return console.log("\uD83D\uDE80 Server ready at http://localhost:" + port + server.graphqlPath);
});
