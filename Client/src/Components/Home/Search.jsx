//import React from 'react'
import { useState, useEffect } from 'react';
import '../../main.scss';
import { countries } from '../../assets/Data/Countries';
import { IoSwapVertical } from "react-icons/io5";
import barcode from '../../assets/barcode.png';
import adult from '../../assets/adult.png';
import child from '../../assets/child.png';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';

import 'aos/dist/aos.css'


const Search = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('search');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');
    const [tripType, setTripType] = useState('one-way');
    const [returnDate, setReturnDate] = useState('');
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [travelClass, setTravelClass] = useState('economy');

    const [flightNumber, setFlightNumber] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    const swapCountries = () => {
        setSelectedCountry(selectedDestination);
        setSelectedDestination(selectedCountry);

    };

    const handleFlightSearchSubmit = () => {
        localStorage.setItem('flightSearchParams', JSON.stringify({
            selectedCountry,
            selectedDestination,
            tripType,
            departureDate,
            returnDate,
            adults,
            children,
            travelClass
        }));
        navigate('/search-flights');
    };

    const handleStatusSearchSubmit = () => {
        localStorage.setItem('flightSearchParams', JSON.stringify({
            flightNumber,
            departureDate,
            arrivalDate
        }));
        navigate('/status');
    };


    return (
        <div data-aos='fade-up' data-aos-duration='1500' className="search container section">
            <div className="titleContainer">
                <div
                    className={`searchTitle ${activeTab === 'search' ? 'active' : ''}`}
                    onClick={() => setActiveTab('search')}
                >
                    Search
                </div>
                <div
                    className={`statusTitle ${activeTab === 'status' ? 'active' : ''}`}
                    onClick={() => setActiveTab('status')}
                >
                    Status
                </div>
            </div>
            <div className="sectionContainer grid">
                {activeTab === 'search' ? (
                    <>
                        <div className="country">
                            <div className="leftSide">
                                <div className="departure">
                                    <select
                                        value={selectedCountry}
                                        onChange={(e) => setSelectedCountry(e.target.value)}
                                        className="dropdown"
                                    >
                                        <option value="" disabled>Departure</option>
                                        {countries.map((country, index) => (
                                            <option key={index} value={country}>{country}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="iconDiv" onClick={swapCountries}>
                                    <IoSwapVertical />
                                </div>
                                <div className="destination">
                                    <select
                                        value={selectedDestination}
                                        onChange={(e) => setSelectedDestination(e.target.value)}
                                        className="dropdown"
                                    >
                                        <option value="" disabled>Destination</option>
                                        {countries.map((country, index) => (
                                            <option key={index} value={country}>{country}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="barcode">
                                    <img src={barcode} className="barcode" alt="Barcode" />
                                </div>
                            </div>
                        </div>
                        <div className="verticalLine"></div>
                        <div className="rightSide">
                            <div className="topInfo">
                                <label htmlFor="tripType">Trip Type</label>
                                <select id="tripType" value={tripType} onChange={(e) => setTripType(e.target.value)} >
                                    <option value="one-way">One-way</option>
                                    <option value="round-trip">Round-trip</option>
                                </select>

                                <div className="date-group">
                                    <label htmlFor="departureDate">Departure Date </label>
                                    <input
                                        type="date"
                                        id="departureDate"
                                        value={departureDate}
                                        onChange={(e) => {
                                            setDepartureDate(e.target.value);
                                            if (tripType === 'round-trip' && returnDate < e.target.value) {
                                                setReturnDate('');
                                            }
                                        }}
                                    />
                                    {tripType === 'round-trip' && (
                                        <>
                                            <label htmlFor="returnDate">Return Date:</label>
                                            <input
                                                type="date"
                                                id="returnDate"
                                                value={returnDate}
                                                onChange={(e) => setReturnDate(e.target.value)}
                                                min={departureDate}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="bottonInfo">
                                <img src={adult} className="adult" alt="Adult" />
                                <label htmlFor="adults">Adults:</label>
                                <select
                                    id="adults"
                                    value={adults}
                                    onChange={(e) => setAdults(Number(e.target.value))}
                                    className="dropdown"
                                >
                                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                                        <option key={num} value={num}>
                                            {num}
                                        </option>
                                    ))}
                                </select>
                                <img src={child} className="child" alt="Child" />
                                <label htmlFor="children">Children:</label>
                                <select
                                    id="children"
                                    value={children}
                                    onChange={(e) => setChildren(Number(e.target.value))}
                                    className="dropdown"
                                >
                                    {Array.from({ length: 6 }, (_, i) => i).map((num) => (
                                        <option key={num} value={num}>
                                            {num}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="travelClass">Travel Class:</label>
                                <select
                                    id="travelClass"
                                    value={travelClass}
                                    onChange={(e) => setTravelClass(e.target.value)}
                                    className="dropdown"
                                >
                                    <option value="economy">Economy</option>
                                    <option value="business">Business</option>
                                    <option value="first-class">First Class</option>
                                </select>
                            </div>
                            <button className="searchBtn" onClick={handleFlightSearchSubmit}>
                                Search Flights
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="statusSearchContainer">
                        <div className="statusInputGroup">
                            <label htmlFor="flightNumber">Flight Number</label>
                            <input 
                                className="flightNumberInput"
                                type="text"
                                id="flightNumber"
                                value={flightNumber}
                                onChange={(e) => setFlightNumber(e.target.value)}
                                placeholder="Enter Flight Number"
                            />
                        </div>
                        <div className="statusInputGroup">
                            <label htmlFor="statusDepartureDate">Departure Date</label>
                            <input
                                type="date"
                                id="statusDepartureDate"
                                value={departureDate}
                                onChange={(e) => setDepartureDate(e.target.value)}
                            />
                        </div>
                        <div className="statusInputGroup">
                            <label htmlFor="statusArrivalDate">Arrival Date</label>
                            <input
                                type="date"
                                id="statusArrivalDate"
                                value={arrivalDate}
                                onChange={(e) => setArrivalDate(e.target.value)}
                            />
                        </div>
                        <button
                            className="statusSearchBtn"
                            onClick={handleStatusSearchSubmit}
                        >
                            Search Status
                        </button>
                    </div>

                )}
            </div>
        </div>
    );
};

export default Search;