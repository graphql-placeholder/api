const { GraphQLServer } = require('graphql-yoga')
const fs = require('fs')
const objectid = require('objectid')
const users = JSON.parse(fs.readFileSync('./datas/users.json').toString())
const posts = JSON.parse(fs.readFileSync('./datas/posts.json').toString())
const comments = JSON.parse(fs.readFileSync('./datas/comments.json').toString())

const resolvers = {
    Query: {
        user(parent, args) {
            return users.find(user => user.id === args.userId)
        },
        users() {
            return users
        },
        post(parent, args) {
            return posts.find(post => post.id == args.postId)
        },
        posts() {
            return posts
        },
        comment(parent, args) {
            let { commentId } = args
            let comment = comments.find(comment => comment.id == commentId)
            return {
                ...comment,
            }
        },
        comments() {
            return comments
        },
    },
    Mutation: {
        addPost(parent, args, context, info) {
            let { userId, title, body } = args.data
            return {
                id: 101,
                title,
                body,
                userId,
            }
        },
        updatePost(parent, args, context, info) {
            let { postId, data } = args
            let post = posts.find(post => post.id == postId)
            let updatedPost = {
                id: postId,
                ...post,
                ...data,
            }
            return updatedPost
        },
        deletePost(parent, args, context, info) {
            let { postId } = args
            let post = posts.find(post => post.id == postId)
            return {
                ...post,
            }
        },

        addComment(parent, args, context, info) {
            let { userId, postId, body } = args.data
            return {
                id: objectid(),
                userId,
                postId,
                body,
            }
        },
        updateComment(parent, args, context, info) {
            let { commentId, data } = args
            let comment = comments.find(comment => comment.id == commentId)
            return {
                id: commentId,
                ...comment,
                ...data,
            }
        },
        deleteComment(parent, args, context, info) {
            let { commentId, data } = args
            let comment = comments.find(comment => comment.id == commentId)
            return {
                ...comment,
            }
        },
    },
    Post: {
        author(parent) {
            return users.find(user => user.id === parent.userId)
        },
        comments(parent) {
            return comments.filter(comment => comment.postId === parent.id)
        },
    },
    User: {
        posts(parent) {
            return posts.filter(post => post.userId === parent.id)
        },
    },
    Comment: {
        post(parent) {
            return posts.find(post => post.id === parent.postId)
        },
        author(parent) {
            return users.find(user => user.id === parent.userId)
        },
    },
}
const server = new GraphQLServer({
    typeDefs: `${__dirname}/typeDefs.graphql`,
    resolvers,
})

/**
 * Start Graphql Server
 */
let port = process.env.PORT || 4000
server.start({ port }, ({ port }) => {
    console.log('Grapgql server working at http://localhost:' + port)
})
