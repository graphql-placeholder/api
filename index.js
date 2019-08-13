import { GraphQLServer } from 'graphql-yoga'
import fs from 'fs'
import objectid from 'objectid'
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
        posts() {
            return posts
        },
        post(parent, args) {
            if (args.postId) return posts.find(post => post.id === args.postId)
            return posts
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
        addComment(parent, args, context, info) {
            let { userId, postId, body } = args.data
            return {
                id: objectid(),
                userId,
                postId,
                body,
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
const server = new GraphQLServer({ typeDefs: `${__dirname}/typeDefs.graphql`, resolvers })

let port = process.env.PORT || 4000
server.start({ port }, ({ port }) => {
    console.log('Grapgql server working at http://localhost:' + port)
})
