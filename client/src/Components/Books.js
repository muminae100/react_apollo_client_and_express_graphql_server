import React from 'react';
import { Link } from "react-router-dom";
import { useAllBooks } from "../Hooks/useAllBooks";


const Books = () => {
    const { data, error, loading } = useAllBooks();

    if(loading) return "Loading...";

    if(error) return `Something went wrong...${error}`

    return (
      <div>
      <h1>All books</h1>
      {data.books.map((book, index) => (
      <Link key={index} to={`/book/${book.id}`}>
      <p>{book.name}</p>
      </Link>
      ))}
      </div>
    )
}

export default Books;
