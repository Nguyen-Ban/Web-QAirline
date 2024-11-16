//import React from 'react'
import '../../main.scss';
import { countries } from '../../assets/Data/Countries';
import { useState } from 'react';
import {IoSwapVertical} from "react-icons/io5";
import barcode from '../../assets/barcode.png'
import { useEffect } from 'react';

import Aos from 'aos'
import 'aos/dist/aos.css'


const Search = () => {
    useEffect(() => {
        Aos.init({duration: 2000})
      }, [])

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');

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
                        <div className="iconDiv">
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
            </div>
        </div>
    );
};

export default Search