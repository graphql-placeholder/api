"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchData = exports.RESOURCE_TYPE = exports.jsonData = void 0;
//@ts-nocheck
var fs_1 = __importDefault(require("fs"));
var users = JSON.parse(fs_1.default.readFileSync("./datas/users.json").toString());
var posts = JSON.parse(fs_1.default.readFileSync("./datas/posts.json").toString());
var comments = JSON.parse(fs_1.default.readFileSync("./datas/comments.json").toString());
exports.jsonData = { users: users, posts: posts, comments: comments };
var RESOURCE_TYPE;
(function (RESOURCE_TYPE) {
    RESOURCE_TYPE["USERS"] = "users";
    RESOURCE_TYPE["POSTS"] = "posts";
    RESOURCE_TYPE["COMMENTS"] = "comments";
})(RESOURCE_TYPE = exports.RESOURCE_TYPE || (exports.RESOURCE_TYPE = {}));
var FetchData = /** @class */ (function () {
    function FetchData(resourceType, page, limit) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        this.resourceType = resourceType;
        this.page = page;
        this.limit = limit;
        this.data = exports.jsonData[this.resourceType];
    }
    FetchData.prototype.getTotalDataCount = function () {
        return this.data.length;
    };
    FetchData.prototype.getTotalPageCount = function () {
        return Math.floor(this.getTotalDataCount() / this.limit);
    };
    FetchData.prototype.getData = function () {
        var offset = (this.page - 1) * this.limit;
        var res = this.data.slice(offset, offset + this.limit);
        return res;
    };
    FetchData.prototype.getResponse = function () {
        return {
            count: this.getTotalDataCount(),
            currentPage: this.page,
            totalPages: this.getTotalPageCount(),
            data: this.getData(),
        };
    };
    return FetchData;
}());
exports.FetchData = FetchData;
