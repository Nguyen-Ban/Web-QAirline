//import React from 'react' 
import '../../main.scss';
import gridImg from '../../assets/gridImg.png'
import { useEffect } from 'react';

import Aos from 'aos'
import 'aos/dist/aos.css'

const Support = () => {
    useEffect(() => {
        Aos.init({duration: 2000})
      }, [])
      
    return (
        <div className="support container section">
            <div className="sectionContainer">

                <div className="titlesDiv" data-aos='fade-up' data-aos-duration='1500'>
                    <small>Travel suppport</small>
                    <h2>Plan your travel with confidence</h2>
                    <p>Find help with booking and travle plans. see what to expect along the journey!</p>
                </div>

                <div className="infoDiv grid">
                    <div className="textDiv grid">
                        <div data-aos='fade-right' data-aos-duration='1500' className="singleInfo">
                            <span className="number">01</span>
                            <h4>Essential travel guidelines</h4>
                            <p>Stay informed about the latest travel policies and entry requirements.</p>
                        </div>
                        <div data-aos='fade-right' data-aos-duration='1500' className="singleInfo">
                            <span className="number colorOne">02</span>
                            <h4>Premium airport transfers</h4>
                            <p>Enjoy a stress-free start to your trip with our luxury transport options.</p>
                        </div>
                        <div data-aos='fade-right' data-aos-duration='1500' className="singleInfo">
                            <span className="number colorTwo">03</span>
                            <h4>Comprehensive travel protection</h4>
                            <p>Travel confidently with insurance plans designed for global adventures.</p>
                        </div>
                    </div>
                    <div data-aos='fade-left' data-aos-duration='1500' className="imgDiv">
                        <img src={gridImg}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Support