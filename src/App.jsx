//import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Book from './Components/Book/Book';
import AboutUs from './Components/AboutUs/AboutUs';
import Search from './Components/Home/Search';
import Support from './Components/Home/Support';
import Lounge from './Components/Home/Lounge';
import Footer from './Components/Footer/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <div>
            <Home />
            <Search />
            <Support />
            <Lounge />
            <Footer />
          </div>
        } />
        <Route path="/book" element={<Book />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App
