const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const app = express();

const objectid = require("objectid");

const resolvers = {
  Query: {
    user(_, args) {
      return users.find((user) => user.id === args.userId);
    },
    users() {
      return users;
    },
    post(_, args) {
      return posts.find((post) => post.id == args.postId);
    },
    posts() {
      return posts;
    },
    comment(_, args) {
      let { commentId } = args;
      let comment = comments.find((comment) => comment.id == commentId);
      return {
        ...comment,
      };
    },
    comments() {
      return comments;
    },
  },
  Mutation: {
    addPost(parent, args, context, info) {
      let { userId, title, body } = args.data;
      return {
        id: 101,
        title,
        body,
        userId,
      };
    },
    updatePost(parent, args, context, info) {
      let { postId, data } = args;
      let post = posts.find((post) => post.id == postId);
      let updatedPost = {
        id: postId,
        ...post,
        ...data,
      };
      return updatedPost;
    },
    deletePost(parent, args, context, info) {
      let { postId } = args;
      let post = posts.find((post) => post.id == postId);
      return {
        ...post,
      };
    },

    addComment(parent, args, context, info) {
      let { userId, postId, body } = args.data;
      return {
        id: objectid(),
        userId,
        postId,
        body,
      };
    },
    updateComment(parent, args, context, info) {
      let { commentId, data } = args;
      let comment = comments.find((comment) => comment.id == commentId);
      return {
        id: commentId,
        ...comment,
        ...data,
      };
    },
    deleteComment(parent, args, context, info) {
      let { commentId, data } = args;
      let comment = comments.find((comment) => comment.id == commentId);
      return {
        ...comment,
      };
    },
  },
  Post: {
    author(parent) {
      return users.find((user) => user.id === parent.userId);
    },
    comments(parent) {
      return comments.filter((comment) => comment.postId === parent.id);
    },
  },
  User: {
    posts(parent) {
      return posts.filter((post) => post.userId === parent.id);
    },
  },
  Comment: {
    post(parent) {
      return posts.find((post) => post.id === parent.postId);
    },
    author(parent) {
      return users.find((user) => user.id === parent.userId);
    },
  },
};

const server = new ApolloServer({
  schema: `${__dirname}/typeDefs.graphql`,
  resolvers,
});

/**
 * Start Graphql Server
 */
let port = process.env.PORT || 4000;
server.applyMiddleware({ app });
app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
