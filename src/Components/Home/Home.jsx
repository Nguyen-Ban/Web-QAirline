//import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import '../../main.scss';

import homeImage from '../../assets/homeImage.png'

import Aos from 'aos'
import 'aos/dist/aos.css'


const Home = () => {
  useEffect(() => {
    Aos.init({duration: 2000})
  }, [])

    return (
      <div className="main">
        <div className="home">
          <div className="homeImage">
            <div className="imageDiv">
              <img src={homeImage} className="homePageImg" alt="Home Background" />
            </div>
          </div>
          <div className="intro">
            <p data-aos='fade-up' data-aos-duration='2500' className="phrase">Fly to Your Dream Destination</p>
            <p className="explanation">Join us for a safe and comfortable journey with the best airlines. Our commitment to excellence ensures that your travel experience is nothing short of exceptional, from takeoff to landing</p>
            <button className="bookBtn"><Link to="/book">Book now</Link></button>
          </div>
        </div>
      </div>
    );
  };

export default Home