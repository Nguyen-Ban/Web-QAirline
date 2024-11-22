import { useEffect,useState } from 'react';
import '../../main.scss';
import Aos from 'aos'
import 'aos/dist/aos.css'

import passengers from '../../assets/Statistics/passengers.png'
import cargo from '../../assets/Statistics/cargo.png'
import employees from '../../assets/Statistics/employees.png'
import totalOperatingRevenue from '../../assets/Statistics/totalOperatingRevenue.png'

import fleet1 from '../../assets/Fleets/fleet1.png'
import fleet2 from '../../assets/Fleets/fleet2.png'
import fleet3 from '../../assets/Fleets/fleet3.png'
import fleet4 from '../../assets/Fleets/fleet4.png'
import fleet5 from '../../assets/Fleets/fleet5.png'
import fleet6 from '../../assets/Fleets/fleet6.png'

import logo1 from '../../assets/Cooperation/logo1.png';
import logo2 from '../../assets/Cooperation/logo2.png';
import logo3 from '../../assets/Cooperation/logo3.png';
import logo4 from '../../assets/Cooperation/logo4.png';
import logo5 from '../../assets/Cooperation/logo5.png';
import logo6 from '../../assets/Cooperation/logo6.png';
import logo7 from '../../assets/Cooperation/logo7.png';
import logo8 from '../../assets/Cooperation/logo8.png';
import logo9 from '../../assets/Cooperation/logo9.png';
import logo10 from '../../assets/Cooperation/logo10.png';
import logo11 from '../../assets/Cooperation/logo11.png';
import logo12 from '../../assets/Cooperation/logo12.png';
import logo13 from '../../assets/Cooperation/logo13.png';
import logo14 from '../../assets/Cooperation/logo14.png';
import logo15 from '../../assets/Cooperation/logo15.png';
import logo16 from '../../assets/Cooperation/logo16.png';
import logo17 from '../../assets/Cooperation/logo17.png';
import logo18 from '../../assets/Cooperation/logo18.png';
import logo19 from '../../assets/Cooperation/logo19.png';
import logo20 from '../../assets/Cooperation/logo20.png';

const AboutUs = () => {
    useEffect(() => {
        Aos.init({duration: 2000})
      }, [])

    const [activeTab, setActiveTab] = useState('facts');

    const renderFactsFigures = () => (
        <div>
            <section>
                <h2>Company Information</h2>
                <table className="company-info">
                    <tbody>
                        <tr>
                            <th>Company Name</th>
                            <td>QAirline</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>123 Aviation Boulevard, Sky City, SC 12345</td>
                        </tr>
                        <tr>
                            <th>Founding Date</th>
                            <td>January 15, 1995</td>
                        </tr>
                        <tr>
                            <th>Areas of Business</th>
                            <td>Commercial Aviation, Cargo Services, Aviation Training</td>
                        </tr>
                        <tr>
                            <th>No. of Aircraft</th>
                            <td>150+</td>
                        </tr>
                        <tr>
                            <th>Routes</th>
                            <td>250+ destinations across 60 countries</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section>
                <h2 data-aos='fade-up' data-aos-duration='1500' >Company Statistics (as of 2024)</h2>
                <div  className="statistics-grid">
                    <div data-aos='fade-up' data-aos-duration='1500' className="stat-item">
                        <img src={passengers} alt="Passenger Statistics" />
                        <div className="stat-text">
                            <h3>Passengers</h3>
                            <p>International : 13,658 thousand</p>
                            <p>Domestic : 6,107 thousand</p>
                        </div>
                    </div>
                    <div data-aos='fade-up' data-aos-duration='1500'  className="stat-item">
                        <img src={cargo} alt="Cargo Statistics" />
                        <div className="stat-text">
                            <h3>Cargo</h3>
                            <p>International : 1,430 thousand tons</p>
                            <p>Domestic : 36 thousand tons</p>
                        </div>
                    </div>
                    <div data-aos='fade-up' data-aos-duration='1500' className="stat-item">
                        <img src={employees} alt="Employee Statistics" />
                        <div className="stat-text">
                            <h3>Employees</h3>
                            <p>Cabin Crew : 6,173 (32%)</p>
                            <p>Engineering : 4,663 (24%)</p>
                            <p>Administration : 4,128 (21%)</p>
                            <p>Cockpit Crew : 2,755 (14%)</p>
                            <p>Overseas : 1,456 (8%)</p>
                            <p>Other : 250 (1%)</p>
                        </div>
                    </div>
                    <div data-aos='fade-up' data-aos-duration='1500' className="stat-item">
                        <img src={totalOperatingRevenue} alt="Revenue Statistics" />
                        <div className="stat-text">
                            <h3>Total Operating Revenue</h3>
                            <p>Air Transportation : VND 1,044 billion</p>
                            <p>Auxiliary : VND 491 billion</p>
                            <p>Others : VND 241 billion</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2>Our Fleets</h2>
                <div className="fleet-grid">
                    <div data-aos='fade-up' data-aos-duration='1500' className="fleet-item">
                        <img src={fleet1} alt="Fleet 1" />
                        <p>Airbus A380-800</p>
                    </div>
                    <div data-aos='fade-up' data-aos-duration='1500' className="fleet-item">
                        <img src={fleet2} alt="Fleet 2" />
                        <p>Boeing 747-400

                        </p>
                    </div>
                    <div data-aos='fade-up' data-aos-duration='1500' className="fleet-item">
                        <img src={fleet3} alt="Fleet 3" />
                        <p>Boeing 747-8i</p>
                    </div>
                    <div data-aos='fade-up' data-aos-duration='1500' className="fleet-item">
                        <img src={fleet4} alt="Fleet 4" />
                        <p>Boeing 747-8F</p>
                    </div>
                    <div data-aos='fade-up' data-aos-duration='1500' className="fleet-item">
                        <img src={fleet5} alt="Fleet 5" />
                        <p>Boeing 777F</p>
                    </div>
                    <div data-aos='fade-up' data-aos-duration='1500' className="fleet-item">
                        <img src={fleet6} alt="Fleet 6" />
                        <p>Airbus A321neo</p>
                    </div>
                </div>
            </section>

        </div>
    );

    const renderPhilosophy = () => (
        <div className="philosophy-section">
            <section>
                <h2 data-aos='fade-up' data-aos-duration='1500'>Philosophy</h2>
                <p data-aos='fade-up' data-aos-duration='1500'>At QAirline, we believe in the transformative power of travel. Our philosophy is centered around providing exceptional service, fostering innovation, and ensuring the utmost safety and comfort for every passenger. We are committed to sustainability and strive to minimize our environmental impact while maximizing the positive experiences of our customers. We believe that travel should be an enriching experience, connecting people and cultures, and creating lasting memories.</p>
            </section>

            <section>
                <h2 data-aos='fade-up' data-aos-duration='1500'>Vision</h2>
                <p data-aos='fade-up' data-aos-duration='1500'>Our vision is to be a global leader in the aviation industry, recognized for our excellence in service, innovation, and sustainability. We aim to connect people and cultures, creating a world where travel is seamless, enjoyable, and accessible to all. We envision a future where our airline is synonymous with reliability, comfort, and exceptional customer service, setting new standards in the industry.</p>
            </section>

            <section>
                <h2 data-aos='fade-up' data-aos-duration='1500'>Mission</h2>
                <p data-aos='fade-up' data-aos-duration='1500'>Our mission is to deliver unparalleled travel experiences by prioritizing safety, comfort, and customer satisfaction. We are dedicated to continuous improvement, embracing new technologies, and fostering a culture of respect and inclusivity. At QAirline, we are more than just a means of transportation; we are a bridge to new adventures and lasting memories. We strive to make every journey a memorable one, ensuring that our passengers feel valued and cared for from the moment they book their flight to the moment they reach their destination.</p>
            </section>
        </div>
    );


    const cooperationLogos = [
        logo1, logo2, logo3, logo4, logo5,
        logo6, logo7, logo8, logo9, logo10,
        logo11, logo12, logo13, logo14, logo15,
        logo16, logo17, logo18, logo19, logo20
    ];

    const renderTeam = () => (
        <div>
            <h2>Team Cooperation</h2>
            <div data-aos='fade-up' data-aos-duration='1500' className="cooperation-grid">
                {cooperationLogos.map((logo, index) => (
                    <div key={index} className="cooperation-item">
                        <img
                            src={logo}
                            alt={`Cooperation Partner ${index + 1}`}
                            className="cooperation-logo"
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'philosophy':
                return renderPhilosophy();
            case 'facts':
                return renderFactsFigures();
            case 'team':
                return renderTeam();
            default:
                return null;
        }
    };

    return (
        <div className="about-container">
            <h1 className="title">About Us</h1>
            <div className="tab-navigation">
                <button
                    className={activeTab === 'facts' ? 'active' : ''}
                    onClick={() => setActiveTab('facts')}
                >
                    Facts & Figures
                </button>

                <span className="divider">|</span>
                <button
                    className={activeTab === 'team' ? 'active' : ''}
                    onClick={() => setActiveTab('team')}
                >
                    Team Cooperation
                </button>
                <span className="divider">|</span>
                <button
                    className={activeTab === 'philosophy' ? 'active' : ''}
                    onClick={() => setActiveTab('philosophy')}
                >
                    Philosophy
                </button>
            </div>

            <div className="content-section">
                {renderContent()}
            </div>
        </div>
    );
};

export default AboutUs;