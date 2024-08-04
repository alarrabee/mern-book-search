 //handles HTTP requests
const express = require('express');

//integrates apollo server with graphql and express
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

const path = require('path');

//middleware for authentication
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');


const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

//creates a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
	await server.start();

	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	
    //sets the /grapghql endpoint to use apollo and applies middleware for authentication
    app.use('/graphql', expressMiddleware(server, {
        context: authMiddleware
      }));

	//if we're in production, serve client/build as static assets
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));
        
        //allows client side to handle routing
        app.get('*', (req, res) => {
          res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
      }
	
    //connects database and starts server
	db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};


startApolloServer();