//import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../main.scss';

import homeImage from '../../assets/homeImage/homeImage.png'
import homeImage2 from '../../assets/homeImage/homeImage2.jpg'
import homeImage3 from '../../assets/homeImage/homeImage3.jpg'
import homeImage4 from '../../assets/homeImage/homeImage4.jpg'
import homeImage5 from '../../assets/homeImage/homeImage5.jpg'
import homeImage6 from '../../assets/homeImage/homeImage6.jpg'
import Aos from 'aos'
import 'aos/dist/aos.css'


const Home = () => {
  const images = [
    homeImage,
    homeImage2,
    homeImage3,
    homeImage4,
    homeImage5,
    homeImage6,
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

   useEffect(() => {
    Aos.init({ duration: 2000 });

    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2700); 
    return () => clearInterval(intervalId);
  }, [images.length]);

    return (
      <div className="main">
        <div className="home">
          <div className="homeImage">
            <div className="imageDiv">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                className={`homePageImg ${currentImageIndex === index ? 'active' : ''}`}
                alt={`Home Background ${index + 1}`}
              />
            ))}
            </div>
          </div>
          <div className="intro">
            <p data-aos='fade-up' data-aos-duration='2000' className="phrase">Fly to Your Dream Destination</p>
            <p className="explanation">Join us for a safe and comfortable journey with the best airlines. Our commitment to excellence ensures that your travel experience is nothing short of exceptional, from takeoff to landing</p>
            <button className="bookBtn"><Link to="/search-flights">Book now</Link></button>
          </div>
        </div>
      </div>
    );
  };

export default Home