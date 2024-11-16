//import React from 'react'
import Logo from '../../assets/logo.png'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="footer">
            <div className="sectionContainer container grid">
                <div className="gridOne">
                    <div className="logoDiv">
                         <img src={Logo} className="Logo"/>
                    </div>
                    <p>Your mind should be stronger than your feelings, fly!</p>
                    <div className="socialIcon flex">
                        <FaFacebookF className='icon'/>
                        <FaTwitter className='icon'/>
                        <FaYoutube className='icon'/>
                        <FaInstagram className='icon'/>
                    </div>
                </div>
                <div className="footerLinks">
                    <div className="linkTitle">About our QAirline</div>
                    <li>
                        <a href="">Who we are</a>
                    </li>
                    <li>
                        <a href="">Ethics Charter</a>
                    </li>
                </div>

                <div className="footerLinks">
                    <div className="linkTitle">Terms & Policies</div>
                    <li>
                        <a href="">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="">Terms of Use</a>
                    </li>
                    <li>
                        <a href="">FAQ</a>
                    </li>
                </div>

                <div className="footerLinks">
                    <div className="linkTitle">Information</div>
                    <li>
                        <a href="">In-Flight Meals</a>
                    </li>
                    <li>
                        <a href="">Traveling with Pets</a>
                    </li>
                    <li>
                        <a href="">Other Services</a>
                    </li>
                    <li>
                        <a href="">Trip at a Glance</a>
                    </li>
                </div>
            </div>
        </div>
    )
}

export default Footer;
