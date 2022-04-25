import React from 'react';
import { useAllAuthors } from "../Hooks/useAllAuthors";

const Authors = () => {
 const { data, error, loading } = useAllAuthors();

 if(loading) return "Loading...";

 if(error) return `Something went wrong...${error}`

  return (
    <>
    <h1>All Authors</h1>

    {data.authors.map((author, index) => (
    <p key={index}>{author.name}</p>
    ))}

    </>
  )
}

export default Authors;