import Book from './Components/Book';
import Home from './Components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/book/:id" element={<Book/>} />
        <Route path="*" element={<Home/>}/>
        <Route exact path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
