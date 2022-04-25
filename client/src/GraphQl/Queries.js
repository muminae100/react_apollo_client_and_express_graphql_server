import { gql } from "@apollo/client";

export const ALL_BOOKS_QUERY = gql`
query {
  books{
    id
    name
  }
}
`
export const ALL_AUTHORS_QUERY = gql`
query {
  authors{
    name
  }
}
`