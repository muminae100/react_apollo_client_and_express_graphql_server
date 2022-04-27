import React from 'react';
import Books from "./Books";
import Authors from './Authors';
import AddBook from './AddBook';
import '../App.css';

const Home = () => {
  return (
    <div className='app'>
    <div>
    <Books />
    <Authors />
    </div>  
    <div>
    <AddBook />
    </div>
    </div>
  )
}

export default Home;