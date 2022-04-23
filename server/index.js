const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull, 
    GraphQLString
} = require("graphql");

const app = express();

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'HelloWorld',
        description: 'Hello world!',
        fields: () =>({
            message: {
            type: GraphQLString, 
            resolve: () => 'Hello World!'
            }
        })
    })
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

PORT = 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`) )