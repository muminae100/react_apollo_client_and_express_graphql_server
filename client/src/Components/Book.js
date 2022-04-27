import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";


const BOOK_QUERY = gql`
    query GetBook($id: Int!){
    book(id: $id){
        id
        name
        author{
            name
        }
    }
    }
`

const Book = () => {
    const {id} = useParams();
    const { data, error, loading } = useQuery(BOOK_QUERY,{
    variables: {id: Number(id)},
    });
    

    if(loading) return "Loading...";

    if(error) return `Something went wrong...${error.message}`

    if (!data) return <p>Not found</p>;
  return (
    <div>
        <h2>Book details</h2>
        <p>Book Id: {data.book.id}</p>
        <p>Title: {data.book.name}</p>
        <p>Book author: {data.book.author.name}</p>
    </div>
  )
}

export default Book;