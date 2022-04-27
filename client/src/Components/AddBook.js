import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { ADD_BOOK_MUTATION } from "../GraphQl/Mutations";

const AddBook = () => {
    const [inputs, setInputs] = useState({});
    const [addBook, { data, error, loading }] = useMutation(ADD_BOOK_MUTATION, {
      variables: {
        name: inputs.name,
        authorId: Number(inputs.author),
      },
    });

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
    
    if(loading) return "Submiting...";
    
    if(error) return `An error occured.. ${error}`;
    
  
    return (
     <>
      <h1>Add book</h1>
  
        <label>Enter book name: <br />
        <input 
          type="text" 
          name="name" 
          value={inputs.name || ""} 
          onChange={handleChange}
        /> <br />
        </label>
        <label>Author: <br />
          <input 
            type="number" 
            name="author" 
            value={inputs.author || ""} 
            onChange={handleChange}
          />
          </label> <br />
          <button onClick={addBook}>{loading ? "Loading..." : "Add book"}</button>

      <div>
        {data &&(
        <p style={{"color":"green"}}>Success, {data.book.name} added to books.</p>
        )}
      </div>
      </>
    )
}

export default AddBook;