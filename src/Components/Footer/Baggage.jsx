import { useState } from 'react';

import carryOn from '../../assets/Baggage/carryOn.png'
import personal from '../../assets/Baggage/personal.png'
import firstPrestige from '../../assets/Baggage/firstPrestige.png'
import overhead from '../../assets/Baggage/overhead.png'
import onTheSeat from '../../assets/Baggage/onTheSeat.png'
import underSeat from '../../assets/Baggage/underSeat.png'
import underYourSeat from '../../assets/Baggage/underYourSeat.png'

const Baggage = () => {
    const [selectedClass, setSelectedClass] = useState('economy');
    const [selectedSection, setSelectedSection] = useState('carry-on');
    const [activeSpecialTab, setActiveSpecialTab] = useState('musical');
    const [activeRestrictedTab, setActiveRestrictedTab] = useState('prohibit');

    const renderCarryOnDetails = () => {
        if (selectedClass === 'economy') {
            return (
                <div className="carry-on-details economy">
                    <div className="carry-on-section">
                        <div className="carry-on-bag">
                            <h3>Carry-on Bag</h3>
                            <img src={carryOn} alt="Carry-on Bag" />
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="light-gray"><strong>Size:</strong></td>
                                        <td>Within 115 cm (45 in) in total length x width x height (including handles and wheels)</td>
                                    </tr>
                                    <tr>
                                        <td className="light-gray"><strong>Example:</strong></td>
                                        <td>Carry-on carrier, backpack, boston bag, etc</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="personal-item">
                            <h3>Personal Item</h3>
                            <img src={personal} alt="Personal Item" />
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="light-gray"><strong>Size:</strong></td>
                                        <td>Within 40cm x 30cm x 15cm</td>
                                    </tr>
                                    <tr>
                                        <td className="light-gray"><strong>Example:</strong></td>
                                        <td>Handbag, briefcase, laptop bag, etc</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="carry-on-details first-prestige">
                    <div className="first-prestige-details">
                        <img src={firstPrestige} alt="First/Prestige Carry-on" />
                        <table>
                            <tbody>
                                <tr>
                                    <td className="light-gray"><strong>Pieces:</strong></td>
                                    <td>Two carry-on bags</td>
                                </tr>
                                <tr>
                                    <td className="light-gray"><strong>Total Weight:</strong></td>
                                    <td>18 kg (40 lb)</td>
                                </tr>
                                <tr>
                                    <td className="light-gray"><strong>Size:</strong></td>
                                    <td>No more than 115 cm (45 in) in total length x width x height, or 20 cm on each side of A, 55 cm on B, and 40 cm on C (including handles and wheels)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    };

    const renderStowingBaggage = () => (
        <>
            <div className="stowing-baggage">
                <h2>Stowing Baggage on Board</h2>
                <div className="stowing-grid">
                    <div className="gray-section">
                        <p>Place it in the overhead bin</p>
                    </div>
                    <div className="white-section">
                        <p>If your baggage is bulky, please place it in the overhead bin instead of under the seat. Please ensure the luggage is secure and does not fall while stowing it in the overhead bin.</p>
                    </div>
                    <div className="image-section">
                        <div className="overhead-bin">
                            <img src={overhead} alt="Overhead Bin" />
                            <p>Overhead bin</p>
                        </div>
                        <div className="on-seat">
                            <img src={onTheSeat} alt="On Seat" />
                            <p>On the seat</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="stowing-baggage">
                <div className="stowing-grid">
                    <div className="gray-section">
                        <p>Stow it under the seat</p>
                    </div>
                    <div className="white-section">
                        <p>When putting your baggage under the seat, please place it under the seat in front of you instead of under your own seat.</p>
                    </div>
                    <div className="image-section">
                        <div className="overhead-bin">
                            <img src={underSeat} alt="Overhead Bin" />
                            <p>Under the seat in front</p>
                        </div>
                        <div className="on-seat">
                            <img src={underYourSeat} alt="On Seat" />
                            <p>Under your seat</p>
                        </div>
                    </div>
                </div>
                <p>* Make sure you do not leave any items behind when leaving the aircraft.</p>
            </div>
        </>
    );

    const renderMusicalInstruments = () => (
        <div className="content-section">
            <h3>Musical instruments</h3>
            <div className="content-box">
                <h4>Musical instruments that can be carried on board</h4>
                <ul>
                    <li>Musical instruments with total linear dimensions (length + width + height) of 115 cm (45 in) or less, such as violins, may be carried on board for free. Please store them in the overhead bin or under the seat in front of you.</li>
                    <li>You must book a seat at the Service Center for musical instruments with total linear dimensions exceeding 115 cm (45 in), such as cellos, double basses, geomungo, etc.</li>
                </ul>
                
                <h4>Musical instruments as checked baggage</h4>
                <ul>
                    <li>As musical instruments are easily damaged, we recommend carrying them on board or purchasing a separate seat to transport them.</li>
                    <li>Your musical instrument must be placed in a securely padded hard case that is designed for travel, and you must fill out the Limitation of Liability (Musical Instruments) when you check in at the counter.</li>
                    <li>If the sum of the three dimensions exceeds 203 cm (80 in) and the weight is over 32 kg (70 lb), you can bring it on board by purchasing a separate seat for the item, or arrange for its transportation via a freight forwarder.</li>
                </ul>
            </div>
        </div>
    );

    const renderSportsEquipment = () => (
        <div className="content-section">
            <h3>Sports equipment</h3>
            <div className="content-box">
                <h4>Specifications allowed for transportation</h4>
                <table className="specs-table">
                    <thead>
                        <tr>
                            <th>Specification</th>
                            <th>Limit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Max weight for transportation</td>
                            <td>32 kg (70 lb) or less</td>
                        </tr>
                        <tr>
                            <td>Max size for transportation</td>
                            <td>Total linear dimensions (width + length + height) of 292 cm/115 in or less</td>
                        </tr>
                    </tbody>
                </table>
                <p>When packing sports equipment, particular attention is required as it is prone to bending or damage during transportation.</p>
                <p>Please note that sports equipment not in a hard case (or an exclusive packing container) cannot be compensated for damage.</p>
                
                <h4>Transportation charges</h4>
                <ul>
                    <li>The excess charge for sports equipment varies by equipment. Please see the charges by sports equipment.</li>
                    <li>The excess baggage charge for your cabin class and itinerary applies to any excess baggage fees.</li>
                </ul>
            </div>
        </div>
    );

    const renderElectricWheelchairs = () => (
        <div className="content-section">
            <h3>Electric wheelchairs</h3>
            <div className="content-box">
                <h4>Transporting</h4>
                <ul>
                    <li>The bodies of electric wheelchairs are transported as checked baggage as per dangerous goods regulations.</li>
                    <li>Electric wheelchairs require additional safety measures by the airline. Please inform us of the details upon booking.</li>
                </ul>

                <h4>Lithium batteries in electric wheelchairs</h4>
                <div className="battery-types">
                    <div className="battery-box">
                        <h5>If batteries cannot be removed</h5>
                        <p>(Carry-on X, Checked O)</p>
                        <ul>
                            <li>Fix the battery to the wheelchair after taking a short-circuit prevention measure</li>
                        </ul>
                    </div>
                    <div className="battery-box">
                        <h5>If batteries can be removed</h5>
                        <p>(Carry-on O, Checked X)</p>
                        <ul>
                            <li>Spare lithium batteries over 300Wh</li>
                            <li>Spare batteries (Passengers may carry up to 300Wh for one battery and up to 160Wh each for a set of two batteries)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderValuables = () => (
        <div className="content-section">
            <h3>Valuables</h3>
            <div className="content-box">
                <h4>Are you carrying valuables?</h4>
                <ul>
                    <li>Excess value charges are to guarantee additional compensation when a checked valuable item becomes damaged or lost if you declare the item before your trip.</li>
                    <li>For Korean Air flight segments, Korean Air operates an Excess Value Charges system to provide compensation of up to USD 2,500 when passengers pay the prescribed charges.</li>
                </ul>

                <h4>Basis of excess value charges</h4>
                <ul>
                    <li>If you are declaring valuables, a fee is calculated at USD 0.5 per USD 100 of the declared value. You also need to present a document that verifies the price of each item.</li>
                    <li>For details, please see the terms of carriage. Inquire the staff upon checking your baggage.</li>
                </ul>

                <h4>Inadequate for transportation</h4>
                <p>Checked baggage that is inadequate for transportation (e.g., unacceptable packaging, easily damaged items, etc.) may be excluded from the Excess Value Charges system and compensation.</p>
            </div>
        </div>
    );

    const renderProhibited = () => (
        <div className="content-section">
            <h3>Prohibited Items</h3>
            <p>The following items are prohibited from the aircraft and cannot be transported in carry-on or checked baggage. (carry-on is prohibited  X, checked baggage is prohibited  X)</p>
            <br></br>
            <div className="content-box">
                <h4>Combustible/flammable materials</h4>
                <ul>
                    <li>Gasoline, paint, lighter fluid, and other combustible or flammable materials</li>
                </ul>

                <h4>Pressurized gas containers</h4>
                <ul>
                    <li>Butane gas cartridges and other pressurized gas containers</li>
                </ul>

                <h4>Weapons and explosives</h4>
                <ul>
                    <li>Weapons and explosives such as firearms and firecrackers</li>
                </ul>

                <h4>Other hazardous materials</h4>
                <ul>
                    <li>Fire extinguishers, aerosols (insecticide, etc.), bleach, and other items which can pose hazards to passengers and the aircraft</li>
                </ul>
            </div>
        </div>
    );

    const renderRestricteCarryOn = () => (
        <div className="content-section">
            <h3>Restriced carry-on items</h3>
            <p>The following items are prohibited from the aircraft and cannot be transported in carry-on or checked baggage. (carry-on is prohibited  X, checked baggage is prohibited  X)</p>
            <div className="content-box">
                <h4>Liquids (international flights departing from or transferring overseas)</h4>
                <ul>
                    <li>Liquids and gels such as food, beverages, cosmetics, sprays, creams, etc.</li>
                    <li>100 ml or less per container up to a total of 1 liter per person, sealed in a plastic bag</li>
                </ul>

                <h4>Medicine</h4>
                <ul>
                    <li>Personal medication required for travel</li>
                    <p>*Passengers must be able to present a doctor’s note or prescription for prescription drugs.</p>
                </ul>

                <h4>Others</h4>
                <ul>
                    <li>Less than 2.5 kg of dry ice per person</li>
                    <li>Maximum 12 oz (350 ml) of powder-like substances per person (flights to and from the US and flights from Australia)</li>
                </ul>
            </div>
        </div>
    );

    const renderRestricteCheckIn = () => (
        <div className="content-section">
            <h3>Restricted checked items</h3>
            <p>The items below cannot be checked as baggage, so please carry them with you. (Carry-on  Allowed O, Checked  is prohibited X)</p>
            <br></br>
            <div className="content-box">
                <h4>Fragile or perishable items</h4>
                <ul>
                    <li>Ceramics, frames, glassware, etc.</li>
                </ul>

                <h4>Spare batteries for portable electronic devices permitted on flight are only permitted for carry-on</h4>
                <ul>
                    <li>Nickel–hydrogen, nickel–cadmium, manganese, etc.</li>
                </ul>

                <h4>Spare lithium batteries</h4>
                <ul>
                    <li>Spare batteries within 160Wh and individually protected to prevent short circuit</li>
                    <li>They may not be transported if batteries exceed the maximum limit or cannot be confirmed. (not permitted in either carry-on or checked baggage)</li>
                </ul>
            </div>
        </div>
    );


    const renderSpecialBaggageContent = () => (
        <div className="special-baggage-container">
            <div className="tabs">
                {[
                    { id: 'musical', label: 'Musical Instruments' },
                    { id: 'sports', label: 'Sports Equipment' },
                    { id: 'wheelchair', label: 'Electric Wheelchairs' },
                    { id: 'valuables', label: 'Valuables' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        className={`tab-button ${activeSpecialTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveSpecialTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {activeSpecialTab === 'musical' && renderMusicalInstruments()}
                {activeSpecialTab === 'sports' && renderSportsEquipment()}
                {activeSpecialTab === 'wheelchair' && renderElectricWheelchairs()}
                {activeSpecialTab === 'valuables' && renderValuables()}
            </div>
        </div>
    );

    const renderRestrictedItem = () => (
        <div className="restricted-item-container">
            <div className="tabs">
                {[
                    { id: 'prohibit', label: 'Prohibited Item' },
                    { id: 'carry-on', label: 'Restricted carry-on' },
                    { id: 'check-in', label: 'Restricted check-in' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        className={`tab-button ${activeRestrictedTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveRestrictedTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {activeRestrictedTab === 'prohibit' && renderProhibited()}
                {activeRestrictedTab === 'carry-on' && renderRestricteCarryOn()}
                {activeRestrictedTab === 'check-in' && renderRestricteCheckIn()}
            </div>
        </div>
    );


    const renderContent = () => {
        switch (selectedSection) {
            case 'carry-on':
                return (
                    <>
                        <div className="booking-class-selector">
                            <h2>Allowance by Booking Class</h2>
                            <div className="class-navigation">
                                <span
                                    className={selectedClass === 'economy' ? 'active' : ''}
                                    onClick={() => setSelectedClass('economy')}
                                >
                                    Economy
                                </span>
                                <span className="divider">|</span>
                                <span
                                    className={selectedClass === 'first-prestige' ? 'active' : ''}
                                    onClick={() => setSelectedClass('first-prestige')}
                                >
                                    First/Prestige
                                </span>
                            </div>
                        </div>

                        {renderCarryOnDetails()}
                        {renderStowingBaggage()}
                    </>
                );
            case 'special':
                return renderSpecialBaggageContent();
            case 'restricted':
                return renderRestrictedItem();
            case 'delayed':
                return <div>Delayed Baggage Content</div>;
            case 'damaged':
                return <div>Damaged Baggage Content</div>;
            default:
                return null;
        }
    };

    return (
        <div className="baggage-page">
            <div className="sidebar">
                <ul>
                    <li
                        className={selectedSection === 'carry-on' ? 'active' : ''}
                        onClick={() => setSelectedSection('carry-on')}
                    >
                        Carry-on Baggage
                    </li>
                    <li
                        className={selectedSection === 'special' ? 'active' : ''}
                        onClick={() => setSelectedSection('special')}
                    >
                        Special Baggage
                    </li>
                    <li
                        className={selectedSection === 'restricted' ? 'active' : ''}
                        onClick={() => setSelectedSection('restricted')}
                    >
                        Restricted Items
                    </li>
                    <li
                        className={selectedSection === 'delayed' ? 'active' : ''}
                        onClick={() => setSelectedSection('delayed')}
                    >
                        Delayed Baggage
                    </li>
                    <li
                        className={selectedSection === 'damaged' ? 'active' : ''}
                        onClick={() => setSelectedSection('damaged')}
                    >
                        Damaged Baggage
                    </li>
                </ul>
            </div>
            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default Baggage;