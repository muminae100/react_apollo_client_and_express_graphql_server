const express = require("express");
const { graphqlHTTP } = require("express-graphql");
var cors = require('cors')  

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull, 
    GraphQLString
} = require("graphql");

const app = express();
app.use(cors()) 


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

const rootMutationType = new GraphQLObjectType({
    name: "RootMutation",
    description: "This is the root mutation",
    fields: () =>({
        addBook: {
            type: bookType,
            description: 'Add a book',
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                authorId: {type: GraphQLNonNull(GraphQLInt)}
            },
            resolve: (parent, args) => {
                const book = {
                    id: books.length + 1,
                    name: args.name,
                    authorId: args.authorId
                }

                books.push(book)

                return book
            }
        },
        addAuthor: {
            type: authorType,
            description: 'Add an author',
            args: {
                name: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve: (parent, args) => {
                const author = {
                    id: authors.length + 1,
                    name: args.name,
                }

                authors.push(author)

                return author
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: rootQueryType,
    mutation: rootMutationType
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

PORT = 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`) )