
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
  	    user(id: ID, username: String!): User
        me: User
	}

	type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(username: String, email: String, password: String!): Auth
        saveBook(book: BookInput!): User
        deleteBook(bookId: String!): User
	}

`

module.exports = typeDefs;