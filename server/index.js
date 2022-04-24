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


const authors = [
	{ id: 1, name: 'J. K. Rowling' },
	{ id: 2, name: 'J. R. R. Tolkien' },
	{ id: 3, name: 'Brent Weeks' }
]

const books = [
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
	{ id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
	{ id: 5, name: 'The Two Towers', authorId: 2 },
	{ id: 6, name: 'The Return of the King', authorId: 2 },
	{ id: 7, name: 'The Way of Shadows', authorId: 3 },
	{ id: 8, name: 'Beyond the Shadows', authorId: 3 }
]


const rootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'This is the root query',
    fields: () =>({
        books: {
        type: GraphQLList(bookType), 
        resolve: () => books
        },
        authors: {
        type: GraphQLList(authorType), 
        resolve: () => authors
        },
        book: {
        type: bookType,
        description: 'A single book',
        args: {
            id: {type: GraphQLInt}
        },
        resolve: (parent, args) => {
            return books.find(book => book.id === args.id)
        }
        },
        author: {
            type: authorType,
            description: 'A single author',
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (parent, args) => {
                return authors.find(author => author.id === args.id)
            }
        }
    })
})

const bookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This is a single book',
    fields: () =>({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)},
        authorId: {type: GraphQLNonNull(GraphQLInt)},
        author: {
            type: authorType,
            resolve: (book) =>{
                return authors.find(author => author.id === book.authorId)
            } 
        }   
    })
})

const authorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This is a single author',
    fields: () =>({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)},
        books: {
            type: GraphQLList(bookType),
            resolve: (author) =>{
                return books.filter(book => book.authorId === author.id)
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: rootQueryType
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

PORT = 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`) )