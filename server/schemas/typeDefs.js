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
		bookId: ID!
		title: String!
		authors: [String]
		description: String!
		image: String
		link: String
	}

	type Query {
		users[User]
  	user(username: String!): User
	}

	type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
  	login(username: String, email: String, password: String!): Auth
  	saveBook(book: BookInput!): User
  	deleteBook(bookId: ID!): User
	}

`

module.exports = typeDefs;