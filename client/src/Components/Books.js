import React from 'react';
import { useAllBooks } from "../Hooks/useAllBooks";


const Books = () => {
    const { data, error, loading } = useAllBooks();

    if(loading) return "Loading...";

    if(error) return `Something went wrong...${error}`

    return (
      <div>
      <h1>All books</h1>
      {data.books.map((book, index) => (
      <p key={index}>{book.name}</p>
      ))}
      </div>
    )
}

export default Books;
