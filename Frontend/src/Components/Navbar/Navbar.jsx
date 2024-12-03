//import React, {useState} from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../main.scss';
import axios from 'axios';

import logo from '../../assets/logo.png'
import userProfileImage from '../../assets/user.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserInfo(token);
        }

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

    const fetchUserInfo = async (token) => {
        try {
            const response = await axios.get('http://localhost:4000/api/auth/current-user', {
                headers: { 
                    'Authorization': token 
                }
            });
            setUserInfo(response.data);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error fetching user info:', error);
            localStorage.removeItem('token');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserInfo(null);
        window.location.href = '/login';
    };


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
                            <li className="listItem"><Link to="/search-flights">Search Flights</Link></li>
                            <li className="listItem"><Link to="/about-us">About us</Link></li>
                        </ul>
                    </div>

                    {isLoggedIn ? (
                        <div className="user-profile-container">
                            <img 
                                src={userProfileImage} 
                                className="user-profile-image" 
                                alt="User Profile"
                                onClick={() => setShowDropdown(!showDropdown)}
                                
                            />
                            {showDropdown && (
                                <div className="user-dropdown">
                                    <div className="dropdown-header">
                                        <img 
                                            src={userProfileImage} 
                                            className="dropdown-profile-image" 
                                            alt="User Profile"
                                        />
                                        <div className="user-details">
                                            <p>{userInfo?.username}</p>
                                            <p>{userInfo?.email}</p>
                                        </div>
                                    </div>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/profile">My Profile</Link></li>
                                        <li><Link to="/bookings">My Bookings</Link></li>
                                        <li onClick={handleLogout}>Log Out</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button className="btn flex">
                            <Link to="/login">Log in</Link>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
} 

export default Navbar