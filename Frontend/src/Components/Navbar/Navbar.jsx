//import React, {useState} from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../main.scss';

import logo from '../../assets/logo.png'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="main">
            <div className="navBarWrapper">
                <div className={`navBar flex ${isScrolled ? 'scrolled' : ''}`}>
                    <div className="logoDiv">
                        <img src={logo} className="Logo"/>
                    </div>

                    <div className="navBarMenu">
                        <ul className="menu flex">
                            <li className="listItem"><Link to="/">Home</Link></li>
                            <li className="listItem"><Link to="/book">Book</Link></li>
                            <li className="listItem"><Link to="/about-us">About us</Link></li>
                        </ul>
                    </div>

                    <button className="btn flex">
                        <Link to="/login">Log in</Link>
                    </button>
                </div>
            </div>
        </div>
    )
} 

export default Navbar