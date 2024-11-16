//import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import '../../main.scss';

import logo from '../../assets/logo.png'

const Navbar = () => {
    return (
        <div className="main">
            <div className="navBarWrapper">
                <div className="navBar flex">
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
                        Log in
                    </button>
                </div>
            </div>
        </div>
    )
} 

export default Navbar