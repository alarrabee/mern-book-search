import { gql } from '@apollo/client';

//get single user
// export const GET_USER = gql`
//   query GetUser($id: ID, $username: String) {
//     user(id: $id, username: $username) {
//       _id
//       username
//       email
//       savedBooks {
//         bookId
//         title
//         authors
//         description
//         image
//         link
//       }
//       bookCount
//     }
//   }
// `;

//get logged-in user
export const GET_ME = gql`
  query me {
    me {
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
`;