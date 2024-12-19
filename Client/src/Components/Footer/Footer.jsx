//import React from 'react'
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer">
            <div className="sb_footer section__padding">
                <div className="sb__footer-links">
                    <div className="sb__footer-links_div">
                        <h4>Contact Us</h4>
                        <div className="socialmedia">
                            <a href="https://www.facebook.com"><FaFacebookF className='icon' /></a>
                            <a href="https://twitter.com"> <FaTwitter className='icon' /></a>
                            <a href="https://www.youtube.com"><FaYoutube className='icon' /></a>
                            <a href="https://www.instagram.com"><FaInstagram className='icon' /></a>
                        </div>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>About our QAirline</h4>
                        <a><Link to="/about-us"><p>Who we are</p></Link></a>
                        <a><Link to="/serviceCenter"><p>Service Center</p></Link></a>
                        <a><Link to="/notice"><p>Notice</p></Link></a>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>Terms & Policies</h4>
                        <a><Link to="/terms-of-use"><p>Terms Of Use</p></Link></a>
                        <a><Link to="/faq"><p>FAQ</p></Link></a>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>Information</h4>
                        <a><Link to="/flight-meal"><p>In flight Meal</p></Link></a>
                        <a href="/other-service"><p>Other Services</p></a>
                        <a href="/trip-glance"><p>Trip at a Glance</p></a>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>Guide</h4>
                        <a><Link to=""><p>Booking Guide</p></Link></a>
                        <a><Link to=""><p>Check In</p></Link></a>
                        <a><Link to="/baggage"><p>Baggage</p></Link></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
