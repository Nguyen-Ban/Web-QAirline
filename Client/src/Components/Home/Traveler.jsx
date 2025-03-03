//import React from 'react'
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

import paris from "../../assets/Travelers/Paris.png"
import vietnam from "../../assets/Travelers/vietnam.png"
import japan from "../../assets/Travelers/japan.png"
import italy from "../../assets/Travelers/italy.png"
import user1 from "../../assets/Travelers/user1.png"
import user2 from "../../assets/Travelers/user2.png"
import user3 from "../../assets/Travelers/user3.png"
import user4 from "../../assets/Travelers/user4.png"

const Traveler = () => {
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        <div className="travelers container section"  data-aos='fade-up' data-aos-duration='1500'>
            <div className="sectionContainer">
                <h4>
                    Top travelers of this month
                </h4>

                <div className="travelersContainer grid"  data-aos='fade-up' data-aos-duration='1500'>
                    <div className="singleTraveler"  data-aos='fade-up' data-aos-duration='1500'>
                        <img src={paris} className="destinationImage" />
                        <div className="travelerDetails">
                            <div className="travelerPicture">
                                <img src={user1} className="travelerImage" />
                            </div>
                            <div className="travelerName">
                                <span>James</span>
                                <p>@james</p>
                            </div>
                        </div>
                    </div>

                    <div className="singleTraveler"  data-aos='fade-up' data-aos-duration='1500'>
                        <img src={japan} className="destinationImage" />
                        <div className="travelerDetails">
                            <div className="travelerPicture">
                                <img src={user2} className="travelerImage" />
                            </div>
                            <div className="travelerName">
                                <span>Olivia</span>
                                <p>@olivia</p>
                            </div>
                        </div>
                    </div>

                    <div className="singleTraveler"  data-aos='fade-up' data-aos-duration='1500'>
                        <img src={vietnam} className="destinationImage" />
                        <div className="travelerDetails">
                            <div className="travelerPicture">
                                <img src={user3} className="travelerImage" />
                            </div>
                            <div className="travelerName">
                                <span>Ethan</span>
                                <p>@3than</p>
                            </div>
                        </div>
                    </div>

                    <div className="singleTraveler"  data-aos='fade-up' data-aos-duration='1500'>
                        <img src={italy} className="destinationImage" />
                        <div className="travelerDetails">
                            <div className="travelerPicture">
                                <img src={user4} className="travelerImage" />
                            </div>
                            <div className="travelerName">
                                <span>Alexander</span>
                                <p>@alexander</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Traveler