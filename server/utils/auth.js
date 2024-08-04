//gives grapghql specific errors
const { GraphQLError } = require('graphql');

//for creating and verifying tokens
const jwt = require('jsonwebtoken');

//set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';


module.exports = {
    AuthenticationError: new GraphQLError('Could not authenticate user', {
			extensions: {
				code: 'UNAUTHENTICATED',
	    },
		}),
        
  //extracts, verifies, and attaches the token.
  authMiddleware: function ({ req }) {
		let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret);
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
    
    return req;
  },

  //creates new token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
