//import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ScrollToTop from './Components/ScrollToTop';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Reservation from './Components/Reservation/Reservation';
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
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import FlightSearch from './Components/Flights/FlightSearch';
import Status from './Components/Flights/Status';
import MyBooking from './Components/Reservation/MyBooking';
import MyTrip from './Components/Reservation/MyTrip';

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
            <Route path="/reservation" element={<Reservation />} />
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
            <Route path="/register" element={<Register />} />
            <Route path="/search-flights" element={<FlightSearch />} />
            <Route path="/status" element={<Status />} />
            <Route path="/my-booking" element={<MyBooking />} />
            <Route path="/my-trip" element={<MyTrip />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App