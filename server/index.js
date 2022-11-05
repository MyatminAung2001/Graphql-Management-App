const express = require('express');
const dotenv = require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('DB connected successfully!')
    })
    .catch((error) => {
        console.log(error)
    });

app.listen(port, console.log(`Server running on port ${port}`))