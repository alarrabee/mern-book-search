// const { User } = require('./models');
// const { signToken, AuthenticationError } = require('./utils/auth');

// const resolvers = {
//     Query: {
//       // Get a single user by ID or username
//       user: async (parent, { id, username }, context) => {
//         const foundUser = await User.findOne({
//           $or: [{ _id: id }, { username }],
//         }).populate('savedBooks');
  
//         if (!foundUser) {
//           throw new Error('Cannot find a user with this id or username!');
//         }
  
//         return foundUser;
//       },
//       // Get the current logged-in user
//       me: async (parent, args, context) => {
//         if (context.user) {
//           return User.findOne({ _id: context.user._id }).populate('books');
//         }
//         throw AuthenticationError;
//       },
//     },
  
//     Mutation: {
//       // Create a user, sign a token, and send it back
//       createUser: async (parent, { username, email, password }) => {
//         const user = await User.create({ username, email, password });
  
//         if (!user) {
//           throw new Error('Something is wrong!');
//         }
  
//         const token = signToken(user);
  
//         return { token, user };
//       },
//       // Login a user, sign a token, and send it back
//       login: async (parent, { username, email, password }) => {
//         const user = await User.findOne({
//           $or: [{ username }, { email }],
//         });
  
//         if (!user) {
//           throw AuthenticationError("Can't find this user");
//         }
  
//         const correctPw = await user.isCorrectPassword(password);
  
//         if (!correctPw) {
//           throw AuthenticationError('Wrong password!');
//         }
  
//         const token = signToken(user);
  
//         return { token, user };
//       },
//       // Save a book to a user's savedBooks
//       saveBook: async (parent, { book }, context) => {
//         if (context.user) {
//           try {
//             const updatedUser = await User.findOneAndUpdate(
//               { _id: context.user._id },
//               { $addToSet: { savedBooks: book } },
//               { new: true, runValidators: true }
//             ).populate('savedBooks');
  
//             return updatedUser;
//           } catch (err) {
//             throw new Error(err);
//           }
//         }
//         throw AuthenticationError('You need to be logged in!');
//       },
//       // Remove a book from a user's savedBooks
//       deleteBook: async (parent, { bookId }, context) => {
//         if (context.user) {
//           const updatedUser = await User.findOneAndUpdate(
//             { _id: context.user._id },
//             { $pull: { savedBooks: bookId } },
//             { new: true }
//           ).populate('savedBooks');
  
//           if (!updatedUser) {
//             throw new Error("Couldn't find user with this id!");
//           }
  
//           return updatedUser;
//         }
//         throw AuthenticationError('You need to be logged in!');
//       },
//     },
//   };
  
//   module.exports = resolvers;











const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    // users: async () => {
    //   return User.find().populate('thoughts');
    // },
    // user: async (parent, { username }) => {
    //   return User.findOne({ username }).populate('thoughts');
    // },
    // thoughts: async (parent, { username }) => {
    //   const params = username ? { username } : {};
    //   return Thought.find(params).sort({ createdAt: -1 });
    // },
    // thought: async (parent, { thoughtId }) => {
    //   return Thought.findOne({ _id: thoughtId });
    // },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    //add new user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    //log in
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    //save a book
    saveBook: async (parent, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: input } },
          { new: true }
        ).populate('savedBooks')

        return updatedUser;
      }
      throw AuthenticationError('You need to be logged in!');
    },

    //delete a book
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        ).populate('savedBooks');

        return updatedUser;
      }
      throw AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
