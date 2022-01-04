const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');

async function startServer() {
    const app = express()
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await apolloServer.start()

    apolloServer.applyMiddleware({ app: app });

    app.use((req, res) => {
        res.send("Hello from express apollo server...")
    });

    await mongoose.connect('mongodb+srv://terry:qwer@cluster0.o7fvd.mongodb.net/GraphQL_Sample?retryWrites=true&w=majority', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    console.log("Mongoose connected!");

    app.listen(4000, () => console.log("Server is running on port 4000!"));
}
startServer();