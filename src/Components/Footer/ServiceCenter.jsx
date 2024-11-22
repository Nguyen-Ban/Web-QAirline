//import React from 'react'
import { useEffect } from 'react';
import '../../main.scss';
import Aos from 'aos'
import 'aos/dist/aos.css'

const ServiceCenter = () => {
    useEffect(() => {
        Aos.init({duration: 2000})
      }, [])

    return (
        <div className="serviceCenter">
            <h1>ServiceCenter</h1>
            <p className="serviceCenter_explanation">You can contact us in Korean, English, Japanese, or Chinese in any region for information on reservation, ticketing, and our services. You can select the local language of your region.
                You can call Korean Air from your region with the local rate or call toll-free.</p>

            <div className="tableContent">
                <h2 data-aos='fade-up' data-aos-duration='1500' className="CountryName">Vietnam</h2>
                <table data-aos='fade-up' data-aos-duration='1500' className="region">
                    <tbody>
                        <tr>
                            <th>Telephone Number</th>
                            <td className="content"><p>1588-2001, 02-2656-2001</p>
                                <br />
                                <br />
                                <p>* The national phone number (1588) may be excluded from the unlimited plan based on the policy of the telephone service provider.</p></td>
                        </tr>
                        <tr>
                            <th>Languages / Hours</th>
                            <td className="content"><p>[Domestic]</p>
                                <p>Vietnamese/English: 07:00–19:00 every day</p>
                                <br />
                                <p>[International]</p>
                                <p>Vietnamese: 07:00–22:00 every day</p>
                                <p>English: 24/7</p>
                                <p>Japanese: 09:00–19:00 every day (Japan Standard Time)</p>
                                <p>Chinese: 08:00–19:00 every day (China Standard Time)</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="tableContent">
                <h2 data-aos='fade-up' data-aos-duration='1500' className="CountryName">The U.S., Canada</h2>
                <table data-aos='fade-up' data-aos-duration='1500' className="region">
                    <tbody>
                        <tr>
                            <th>Telephone Number</th>
                            <td><p>1-213-484-1900</p>
                                <br />
                                <p>Service for customers with hearing impairment and speech impairment : 711</p>
                            </td>
                        </tr>
                        <tr>
                            <th>Languages / Hours</th>
                            <td>
                                <p>Vietnamese/English: 24/7</p>
                                <p>Japanese: 09:00–19:00 every day (Japan Standard Time)</p>
                                <p>Chinese: 08:00–19:00 every day (Chinese Standard Time)</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="tableContent">
                <h2 data-aos='fade-up' data-aos-duration='1500' className="CountryName">Europe</h2>
                <table data-aos='fade-up' data-aos-duration='1500' className="region">
                    <tbody>
                        <tr>
                            <th>Telephone Number</th>
                            <td><p>1-213-484-1900</p>
                                <br />
                                <p>Austria* Ref.1 : 0800-943-623 (toll-free)</p>
                                    <p>Belgium* Ref.1  : 0800-58-287 (toll-free)
                                    <p>Czech Republic* Ref.1  : 800-701-548 (toll-free)</p>
                                    <p>Denmark : 80-400-223 (toll-free)</p>
                                    <p>Finland : 0800-526-634 (toll-free)</p>
                                    <p>France* Ref.1  : 0805-98-79-21 (toll-free)</p>
                                    <p>Germany* Ref.1  : 0800-000-7482 (toll-free)</p>
                                    <p>Greece : 00800-4920-00847 (toll-free)</p>
                                    <p>Hungary : 06-80-200-196 (toll-free)</p>
                                    <p>Ireland : 1-800-832-378 (toll-free)</p>
                                    <p>Italy* Ref.1  : 800-598-965 (toll-free)</p>
                                    <p>Luxembourg : 800-40168 (toll-free)</p>
                                    <p>Netherlands : 0800-382-8280 (toll-free)</p>
                                    <p>Norway : 800-620-12 (toll-free)</p>
                                    <p>Poland : 800-149-971 (toll-free)</p>
                                    <p>Portugal : 800-600-804 (toll-free)</p>
                                    <p>Slovakia : 0800-500-826 (toll-free)</p>
                                    <p>Spain* Ref.1  : 800-000-219 (toll-free)</p>
                                    <p>Sweden : 020-120-3081 (toll-free)</p>
                                    <p>Switzerland* Ref.1  : 0800-140325 (toll-free)</p>
                                    <p>Turkiye : 0800-621-2292 (toll-free)</p>
                                    <p>UK : 0800-0265-883 (toll-free)</p>
                                    <br/>
                                    Other European regions: +33-1-5345-3177</p>
                            </td>
                        </tr>
                        <tr>
                            <th>Languages / Hours</th>
                            <td>
                                <p>Vietnamese/English: 24/7</p>
                                <p>Japanese: 09:00–19:00 every day (Japan Standard Time)</p>
                                <p>Chinese: 08:00–19:00 every day (Chinese Standard Time)</p>
                                <br/>
                                <br/>
                                <p>* Ref.1  Local language service available
                                French/German/Italian/Spanish/Czech: 08:30–17:30 weekdays (Central European Time)</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>What you should know</h2>
            <br />
            <ul>
                <p>- If you connect to a phone number outside your country, you will be charged for an international call.</p>
                <p>- Calls made using toll-free or local phone numbers in your country may be charged or restricted depending on the policy (roming service, prepaid SIM, etc.) of the telephone service provider and hotel conditions.</p>
            </ul>
        </div>
    )
}

export default ServiceCenter