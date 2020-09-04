//@ts-nocheck
import { FetchData, RESOURCE_TYPE, jsonData } from "./FetchData.class";

const resolvers = {
  Query: {
    user(_, args) {
      return jsonData.users.find((user: any) => user.id === args.userId);
    },
    users(_, args) {
      const limit = args.pagination?.limit || 10;
      const page = args.pagination?.page || 1;
      const res = new FetchData(RESOURCE_TYPE.USERS, page, limit);
      return res.getResponse();
    },
    post(_, args) {
      return jsonData.posts.find((post: any) => post.id == args.postId);
    },
    posts(_, args) {
      const limit = args.pagination?.limit || 10;
      const page = args.pagination?.page || 1;
      const res = new FetchData(RESOURCE_TYPE.POSTS, page, limit);
      return res.getResponse();
    },
    comment(_, args) {
      let { commentId } = args;
      let comment = jsonData.comments.find(
        (comment) => comment.id == commentId
      );
      return {
        ...comment,
      };
    },
    comments(_, args) {
      const limit = args.pagination?.limit || 10;
      const page = args.pagination?.page || 1;
      const res = new FetchData(RESOURCE_TYPE.COMMENTS, page, limit);
      return res.getResponse();
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
    updatePost(_, args) {
      let { postId, data } = args;
      let post = jsonData.posts.find((post) => post.id == postId);
      let updatedPost = {
        id: postId,
        ...post,
        ...data,
      };
      return updatedPost;
    },
    deletePost(_, args) {
      let { postId } = args;
      let post = jsonData.posts.find((post) => post.id == postId);
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
    updateComment(_, args) {
      let { commentId, data } = args;
      let comment = jsonData.comments.find(
        (comment) => comment.id == commentId
      );
      return {
        id: commentId,
        ...comment,
        ...data,
      };
    },
    deleteComment(_, args) {
      let { commentId } = args;
      let comment = jsonData.comments.find(
        (comment) => comment.id == commentId
      );
      return {
        ...comment,
      };
    },
  },
  Post: {
    author(parent) {
      return jsonData.users.find((user) => user.id === parent.userId);
    },
    comments(parent) {
      return jsonData.comments.filter(
        (comment) => comment.postId === parent.id
      );
    },
  },
  User: {
    posts(parent) {
      return jsonData.posts.filter((post) => post.userId === parent.id);
    },
  },
  Comment: {
    post(parent) {
      return jsonData.posts.find((post) => post.id === parent.postId);
    },
    author(parent) {
      return jsonData.users.find((user) => user.id === parent.userId);
    },
  },
};

export default resolvers;
