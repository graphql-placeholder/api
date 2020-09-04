"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
var FetchData_class_1 = require("./FetchData.class");
var resolvers = {
    Query: {
        user: function (_, args) {
            return FetchData_class_1.jsonData.users.find(function (user) { return user.id === args.userId; });
        },
        users: function (_, args) {
            var _a, _b;
            var limit = ((_a = args.pagination) === null || _a === void 0 ? void 0 : _a.limit) || 10;
            var page = ((_b = args.pagination) === null || _b === void 0 ? void 0 : _b.page) || 1;
            var res = new FetchData_class_1.FetchData(FetchData_class_1.RESOURCE_TYPE.USERS, page, limit);
            return res.getResponse();
        },
        post: function (_, args) {
            return FetchData_class_1.jsonData.posts.find(function (post) { return post.id == args.postId; });
        },
        posts: function (_, args) {
            var _a, _b;
            var limit = ((_a = args.pagination) === null || _a === void 0 ? void 0 : _a.limit) || 10;
            var page = ((_b = args.pagination) === null || _b === void 0 ? void 0 : _b.page) || 1;
            var res = new FetchData_class_1.FetchData(FetchData_class_1.RESOURCE_TYPE.POSTS, page, limit);
            return res.getResponse();
        },
        comment: function (_, args) {
            var commentId = args.commentId;
            var comment = FetchData_class_1.jsonData.comments.find(function (comment) { return comment.id == commentId; });
            return __assign({}, comment);
        },
        comments: function (_, args) {
            var _a, _b;
            var limit = ((_a = args.pagination) === null || _a === void 0 ? void 0 : _a.limit) || 10;
            var page = ((_b = args.pagination) === null || _b === void 0 ? void 0 : _b.page) || 1;
            var res = new FetchData_class_1.FetchData(FetchData_class_1.RESOURCE_TYPE.COMMENTS, page, limit);
            return res.getResponse();
        },
    },
    Mutation: {
        addPost: function (parent, args, context, info) {
            var _a = args.data, userId = _a.userId, title = _a.title, body = _a.body;
            return {
                id: 101,
                title: title,
                body: body,
                userId: userId,
            };
        },
        updatePost: function (_, args) {
            var postId = args.postId, data = args.data;
            var post = FetchData_class_1.jsonData.posts.find(function (post) { return post.id == postId; });
            var updatedPost = __assign(__assign({ id: postId }, post), data);
            return updatedPost;
        },
        deletePost: function (_, args) {
            var postId = args.postId;
            var post = FetchData_class_1.jsonData.posts.find(function (post) { return post.id == postId; });
            return __assign({}, post);
        },
        addComment: function (parent, args, context, info) {
            var _a = args.data, userId = _a.userId, postId = _a.postId, body = _a.body;
            return {
                id: objectid(),
                userId: userId,
                postId: postId,
                body: body,
            };
        },
        updateComment: function (_, args) {
            var commentId = args.commentId, data = args.data;
            var comment = FetchData_class_1.jsonData.comments.find(function (comment) { return comment.id == commentId; });
            return __assign(__assign({ id: commentId }, comment), data);
        },
        deleteComment: function (_, args) {
            var commentId = args.commentId;
            var comment = FetchData_class_1.jsonData.comments.find(function (comment) { return comment.id == commentId; });
            return __assign({}, comment);
        },
    },
    Post: {
        author: function (parent) {
            return FetchData_class_1.jsonData.users.find(function (user) { return user.id === parent.userId; });
        },
        comments: function (parent) {
            return FetchData_class_1.jsonData.comments.filter(function (comment) { return comment.postId === parent.id; });
        },
    },
    User: {
        posts: function (parent) {
            return FetchData_class_1.jsonData.posts.filter(function (post) { return post.userId === parent.id; });
        },
    },
    Comment: {
        post: function (parent) {
            return FetchData_class_1.jsonData.posts.find(function (post) { return post.id === parent.postId; });
        },
        author: function (parent) {
            return FetchData_class_1.jsonData.users.find(function (user) { return user.id === parent.userId; });
        },
    },
};
exports.default = resolvers;
