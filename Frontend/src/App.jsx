//import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ScrollToTop from './Components/ScrollToTop';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Book from './Components/Book/Book';
import AboutUs from './Components/AboutUs/AboutUs';
import Search from './Components/Home/Search';
import Support from './Components/Home/Support';
import Lounge from './Components/Home/Lounge';
import Footer from './Components/Footer/Footer';
import ServiceCenter from './Components/Footer/ServiceCenter';
import Notice from './Components/Footer/Notice';
import TermsOfUse from './Components/Footer/TermsOfUse';
import Faq from './Components/Footer/Faq';
import FlightMeal from './Components/Footer/FlightMeal';
import OtherService from './Components/Footer/OtherService';
import TripAtGlance from './Components/Footer/TripAtGlance';
import Baggage from './Components/Footer/Baggage';
import Login from './Components/Login/Login';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <div>
                <Home />
                <Search />
                <Support />
                <Lounge />
              </div>
            } />
            <Route path="/book" element={<Book />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/serviceCenter" element={<ServiceCenter />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/flight-meal" element={<FlightMeal />} />
            <Route path="/other-service" element={<OtherService />} />
            <Route path="/trip-glance" element={<TripAtGlance />} />
            <Route path="/baggage" element={<Baggage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App