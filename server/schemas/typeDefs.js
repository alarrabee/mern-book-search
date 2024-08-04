
const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
    bookCount: Int
}

type Auth {
    token: ID!
    user: User!
}

type Book {
    bookId: String!
    title: String!
    authors: [String]
    description: String!
    image: String
    link: String
}

input BookInput {
    bookId: String!
    title: String!
    authors: [String]
    description: String!
    image: String
    link: String
}

type Query {
    user(username: String!): User
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(userId: ID!, book: BookInput!): User
    removeBook(userId: ID!, bookId: String!): User
}

`

module.exports = typeDefs;