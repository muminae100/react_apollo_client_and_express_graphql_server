import { gql } from "@apollo/client";

export const ADD_BOOK_MUTATION = gql`
mutation AddBook($name: String!, $authorId: Int! ){
    addBook(name: $name, authorId: $authorId){
      id
      name
    }
  }
`