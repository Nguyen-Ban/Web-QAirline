//import React from 'react'
import '../../main.scss';
import { countries } from '../../assets/Data/Countries';
import { useState } from 'react';
import { IoSwapVertical } from "react-icons/io5";
import barcode from '../../assets/barcode.png'
import adult from '../../assets/adult.png'
import child from '../../assets/child.png'
import { useEffect } from 'react';

import Aos from 'aos'
import 'aos/dist/aos.css'


const Search = () => {
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');
    const [tripType, setTripType] = useState('one-way');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [travelClass, setTravelClass] = useState('economy');

    const swapCountries = () => {
        setSelectedCountry(selectedDestination);
        setSelectedDestination(selectedCountry);

    };

    return (
        <div data-aos='fade-up' data-aos-duration='1500' className="search container section">
            <div data-aos='fade-up' data-aos-duration='1500' className="title">
                Find your flights
            </div>
            <div data-aos='fade-up' data-aos-duration='1500' className="titleContainer">
                <div className="searchTitle">Search</div>
                <div className="blank"></div>
            </div>
            <div data-aos='fade-up' data-aos-duration='1500' className="sectionContainer grid">
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
                            <img src={barcode} className="barcode" />
                        </div>
                    </div>
                </div>
                <div className="verticalLine"></div>
                <div className="rightSide">
                    <div className="topInfo">
                        <label htmlFor="tripType">Trip Type</label> <select id="tripType" value={tripType} onChange={(e) => setTripType(e.target.value)} > <option value="one-way">One-way</option> <option value="round-trip">Round-trip</option> </select>

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
                        <div className="selectGroup">
                            
                        </div>
                        <img src={adult} className="adult" />
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
                        <img src={child} className="child" />
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
                    <button className="searchBtn">Search</button>
                </div>
            </div>
        </div>
    );
};

export default Search