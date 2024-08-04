import { gql } from '@apollo/client';

//create a new user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        savedBooks {
          bookId
          title
          authors
          description
          image
          link
        }
        bookCount
      }
    }
  }
`;

//log in a user
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
      bookCount
    }
  }
}
`;

//save a book
export const SAVE_BOOK = gql`
  mutation saveBook($book: BookInput!) {
    saveBook(book: $book) {
      _id
      username
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
      bookCount
    }
  }
`;

//remove a book
export const REMOVE_BOOK = gql`
    mutation removeBook($userId: ID!, $bookId: String!) {
    removeBook(userId: $userId, bookId: $bookId) {
      _id
      username
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
      bookCount
    }
  }
`;