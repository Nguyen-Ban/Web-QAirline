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

                <div className="titlesDiv">
                    <small>Travel suppport</small>
                    <h2>Plan your travel with confidence</h2>
                    <p>Find help with booking and travle plans. see what to expect along the journey!</p>
                </div>

                <div className="infoDiv grid">
                    <div className="textDiv grid">
                        <div data-aos='fade-up' data-aos-duration='2500' className="singleInfo">
                            <span className="number">01</span>
                            <h4>Travel requriements for Dubai</h4>
                            <p>Find help with booking and travle plans. see what to expect along the journey!</p>
                        </div>
                        <div data-aos='fade-up' data-aos-duration='2500' className="singleInfo">
                            <span className="number colorOne">02</span>
                            <h4>Chauffeur services at your arrival</h4>
                            <p>Find help with booking and travle plans. see what to expect along the journey!</p>
                        </div>
                        <div data-aos='fade-up' data-aos-duration='2500' className="singleInfo">
                            <span className="number colorTwo">03</span>
                            <h4>Multi-risk travel insurance</h4>
                            <p>Find help with booking and travle plans. see what to expect along the journey!</p>
                        </div>
                    </div>
                    <div data-aos='fade-up' data-aos-duration='2500' className="imgDiv">
                        <img src={gridImg}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Support