require('dotenv').config()
const port = process.env.WEBAPI_PORT || 9999
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers'); 
const initMongoDB = require('./server-mongodb')
 const express = require('express')
 const app = express()
 const Controller = require("./controllers/productsController")
 const { graphqlHTTP } = require('express-graphql')
 const cors = require("cors");
 app.use(cors());
 
// middleware
app.use(express.json())

app.use(express.urlencoded({extended: false}))


app.use('/graphql', graphqlHTTP({
    schema: require('./schemas/graphqlSchema'),
    graphiql: true
}))


// routes

  app.use('/api/products', require("./controllers/productsController"))  
 app.use('/api/authentication', require("./controllers/authenticationController"))
 
const server = new ApolloServer({ 
  typeDefs, 
  resolvers 
});

// initalize
initMongoDB()
app.listen(port, () => console.log(`Web API is running at http://localhost:${port}`))

