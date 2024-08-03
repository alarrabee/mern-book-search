const { User } = require('./models/User');
const { signToken, AuthenticationError } = require('./utils/auth');

const resolvers = {
    Query: {
      // Get a single user by ID or username
      user: async (parent, { id, username }, context) => {
        const foundUser = await User.findOne({
          $or: [{ _id: id }, { username }],
        }).populate('savedBooks');
  
        if (!foundUser) {
          throw new Error('Cannot find a user with this id or username!');
        }
  
        return foundUser;
      },
      // Get the current logged-in user
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('savedBooks');
        }
        throw AuthenticationError('You need to be logged in!');
      },
    },
  
    Mutation: {
      // Create a user, sign a token, and send it back
      createUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
  
        if (!user) {
          throw new Error('Something is wrong!');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
      // Login a user, sign a token, and send it back
      login: async (parent, { username, email, password }) => {
        const user = await User.findOne({
          $or: [{ username }, { email }],
        });
  
        if (!user) {
          throw AuthenticationError("Can't find this user");
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw AuthenticationError('Wrong password!');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
      // Save a book to a user's savedBooks
      saveBook: async (parent, { book }, context) => {
        if (context.user) {
          try {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { savedBooks: book } },
              { new: true, runValidators: true }
            ).populate('savedBooks');
  
            return updatedUser;
          } catch (err) {
            throw new Error(err);
          }
        }
        throw AuthenticationError('You need to be logged in!');
      },
      // Remove a book from a user's savedBooks
      deleteBook: async (parent, { bookId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId } } },
            { new: true }
          ).populate('savedBooks');
  
          if (!updatedUser) {
            throw new Error("Couldn't find user with this id!");
          }
  
          return updatedUser;
        }
        throw AuthenticationError('You need to be logged in!');
      },
    },
  };
  
  module.exports = resolvers;
