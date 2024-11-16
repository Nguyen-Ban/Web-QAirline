//import React from 'react'
import gridImg2 from '../../assets/gridImg2.png'
import { useEffect } from 'react';

import Aos from 'aos'
import 'aos/dist/aos.css'

const Lounge = () => {
    useEffect(() => {
        Aos.init({duration: 2000})
      }, [])

    return (
        <div className="lounge container section">
            <div className="sectionContainer grid">
                <div data-aos='fade-' data-aos-duration='1500' className="imgDiv">
                    <img src={gridImg2}/>
                </div>

                <div data-aos='fade-up' data-aos-duration='1500' className="textDiv">
                    <h2>Unaccompanied Minor Lounge</h2>
                    <div className="grids grid">
                        <div className="singleGrid">
                            <span className='gridTitle'>
                                Assistance at the Airport
                            </span>
                            <p>
                                We ensure your child navigates the airport safely and comfortably.
                            </p>
                        </div>
                        <div className="singleGrid">
                            <span className='girdTitle'>
                                Prioirty Boarding service
                            </span>
                            <p>
                                Children and elderly passengers will board first, ensuring they have ample time to get settled comfortably.
                            </p>
                        </div>
                        <div className="singleGrid">
                            <span className='girdTitle'>
                                In-Flight Care
                            </span>
                            <p>
                                We provide attentive care to keep your child safe and entertained during the flight.
                            </p>
                        </div>
                        <div className="singleGrid">
                            <span className='girdTitle'>
                                Chufferur-drive service
                            </span>
                            <p>
                                Safe and comfortable transportation between the airport and your destination.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lounge