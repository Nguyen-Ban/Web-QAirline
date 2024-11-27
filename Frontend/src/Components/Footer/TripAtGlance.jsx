import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronRight } from "react-icons/fa6";
import { IoTicketOutline, IoTvOutline } from "react-icons/io5";
import { GiPassport } from "react-icons/gi";
import { PiSeat, PiSuitcaseRollingBold, PiAirplaneTakeoff, PiAirplaneInFlight } from "react-icons/pi";
import { LuUtensils, LuCheckSquare, LuBaggageClaim } from "react-icons/lu";
import { RiWheelchairLine } from "react-icons/ri";
import { AiOutlineFileProtect } from "react-icons/ai";
import { MdOutlineLocalAirport, MdOutlineSecurity, MdLocalOffer, MdOutlineLuggage, MdOutlineDirectionsSubwayFilled } from "react-icons/md";
import { GrLounge } from "react-icons/gr";
import { TbTemperatureSun } from "react-icons/tb";
import { FaWifi } from "react-icons/fa";


import Aos from 'aos'
import 'aos/dist/aos.css'

const TripAtGlance = () => {
    useEffect(() => {
        Aos.init({duration: 2000})
    }, [])

    const [activeStep, setActiveStep] = useState(1);

    const steps = [
        {
            title: "Preparation",
            content: "Get ready for your journey with essential pre-flight preparations.",
            grids: [
                {
                    icon: <IoTicketOutline />,
                    iconColor: '#2563eb',
                    title: "Flight ticket search",
                    description: "Your trip starts with a flight ticket search! Select your destination and find the best flight ticket.",
                    action: {
                        label: "Book your ticket",
                        link: "/book"
                    }
                },
                {
                    icon: <GiPassport />,
                    iconColor: '#16a34a',
                    title: "Immigration regulations",
                    description: "Have your passport and necessary documents ready! Check immigration information",
                    action: {
                        label: "Check immigration info",
                        link: "/immigration"
                    }
                },
                {
                    icon: <PiSeat />,
                    iconColor: '#9333ea',
                    title: "Advance seat selection",
                    description: "For a comfortable trip, pre-select your preferred seat - window, aisle, etc.",
                    action: {
                    }
                },
                {
                    icon: <LuUtensils />,
                    iconColor: '#ea580c',
                    title: "Pre-order in-flight meals",
                    description: "Request special meals or infant/children's meals in advance to ensure you're prepared for your flight.",
                    action: {
                        label: "View special meals",
                        link: "/flight-meal"
                    }
                },
                {
                    icon: <RiWheelchairLine />,
                    iconColor: '#dc2626',
                    title: "Special Assistance",
                    description: "Services for passengers needing extra help or with special requirements.",
                    action: {
                        label: "Learn about services",
                        link: "/other-service"
                    }
                },
                {
                    icon: <LuCheckSquare />,
                    iconColor: '#0d9488',
                    title: "Self-service Check-in",
                    description: "Quick and convenient check-in process to save time.",
                    action: {
                        label: "Start Check-in",
                        link: "/check-in"
                    }
                },
                {
                    icon: <PiSuitcaseRollingBold />,
                    iconColor: '#4338ca',
                    title: "Baggage Drop",
                    description: "Understand baggage policies and prepare for smooth luggage handling.",
                    action: {
                        label: "Baggage Info",
                        link: "/baggage"
                    }
                },
                {
                    icon: <AiOutlineFileProtect />,
                    iconColor: '#ca8a04',
                    title: "Travel Insurance",
                    description: "Secure your journey with the right travel insurance.",
                    action: {
                    }
                },
            ]
        },
        {
            title: "Airport",
            content: "Navigate through airport procedures smoothly.",
            grids: [
                
                {
                    icon: <MdOutlineLocalAirport />,
                    iconColor: '#1e40af',
                    title: "Airport Check-In",
                    description: "If you haven't used the advance check-in, you can check in at the airport in a variety of ways.",
                    action: {
                    }
                },
                {
                    icon: <LuBaggageClaim />,
                    iconColor: '#ea580c',
                    title: "Self-service bag drop",
                    description: "If you have received your boarding pass through self-service check-in or at a kiosk, you can check your baggage through the self-service bag drop (automated baggage check-in machine) service.",
                    action: {
                    }
                },
                {
                    icon: <MdOutlineSecurity />,
                    iconColor: '#9333ea',
                    title: "Security checkpoint",
                    description: "The departure area can be crowded, so give yourself plenty of time to get through security.",
                    action: {
                    }
                },
                {
                    icon: <GrLounge />,
                    iconColor: '#16a34a',
                    title: "KAL Lounge",
                    description: "Enjoy a special experience at the KAL Lounge while you wait. For added pre-flight comfort.",
                    action: {
                    }
                },
                {
                    icon: <PiAirplaneTakeoff />,
                    iconColor: '#4338ca',
                    title: "Boarding procedure",
                    description: "Please arrive at your gate with plenty of time to ensure you board safely. Please follow the announcements and board in order.",
                    action: {
                        label: "Baggage Info",
                        link: "/baggage"
                    }
                },
            ]
        },
        {
            title: "In-Flight",
            content: "Enjoy your journey and make the most of your flight experience.",
            grids: [
                {
                    icon: <TbTemperatureSun />,
                    iconColor: '#4338ca',
                    title: "In-flight environment",
                    description: "The cabin temperature is set at 23-25 degrees Celsius, and we recommend wearing lightweight long sleeves and pants; the cabin humidity is between 10-20%, so make sure you stay hydrated",
                    action: {
                    }
                },
                {
                    icon: <LuUtensils />,
                    iconColor: '#dc2626',
                    title: "In-flight meals",
                    description: "We serve a varied menu of seasonally-inspired in-flight meals and carefully selected wines.",
                    action: {
                        label: "Explore flight meals",
                        link: "/flight-meal"
                    }
                },
                {
                    icon: <IoTvOutline />,
                    iconColor: '#ea580c',
                    title: "In-flight entertainment",
                    description: "Discover a variety of content to enhance your in-flight experience.",
                    action: {
                    }
                },
                {
                    icon: <FaWifi />,
                    iconColor: '#9333ea',
                    title: "In-flight Wi-Fi",
                    description: "Take advantage of in-flight Wi-Fi and stay connected to the world while you fly.",
                    action: {
                    }
                },
                {
                    icon: <MdLocalOffer />,
                    iconColor: '#16a34a',
                    title: "In-flight Duty Free Shop",
                    description: "You can also easily purchase duty-free items on board with the flight attendant.",
                    action: {
                    }
                },
            ]
        },
        {
            title: "Arrival",
            content: "Prepare for a smooth arrival at your destination.",
            grids: [
                {
                    icon: <MdOutlineLuggage />,
                    iconColor: '#16a34a',
                    title: "Baggage claim",
                    description: "Upon arrival, go to the baggage claim area to pick up your baggage. Double-check your baggage with your baggage tag to make sure it is yours.",
                    action: {
                        label: "Delayed or lost bags",
                        link: "/baggage"
                    }
                },
                {
                    icon: <MdOutlineDirectionsSubwayFilled />,
                    iconColor: '#1e40af',
                    title: "Destination Airport Information",
                    description: "Learn about everything from transportation to transfers at your destination airport.",
                    action: {
                        label: "Browse Entertainment",
                        link: "/entertainment"
                    }
                },
                {
                    icon: <PiAirplaneInFlight />,
                    iconColor: '#9333ea',
                    title: "Excellent Boarding Pass",
                    description: "Enjoy various partner discounts with your boarding pass for a Korean Air international flight",
                    action: {
                    }
                },
            ]
        }
    ];

    return (
        <div className="trip-steps-section">
            <div className="steps-header">
                {steps.map((step, index) => (
                    <button
                        key={index}
                        className={`step-button ${activeStep === index + 1 ? 'active' : ''}`}
                        onClick={() => setActiveStep(index + 1)}
                    >
                        <span>STEP {index + 1} / 4</span>
                        {index < 3 && <FaChevronRight className="step-icon" />}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeStep}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="step-content"
                >
                    <h2 className="step-title">{steps[activeStep - 1].title}</h2>
                    <p className="step-description">{steps[activeStep - 1].content}</p>
                </motion.div>
            </AnimatePresence>

            <div className="trip-at-a-glance">
                <div className="trip-at-a-glance__grid">
                    {steps[activeStep - 1].grids.map((grid, index) => (
                        <div 
                            key={index} 
                            className="trip-at-a-glance__grid-item"
                        >
                            <div 
                                className="trip-at-a-glance__grid-item-icon" 
                                style={{ color: grid.iconColor }}
                            >
                                {grid.icon}
                            </div>
                            <h3 className="trip-at-a-glance__grid-item-title">{grid.title}</h3>
                            <p className="trip-at-a-glance__grid-item-description">
                                {grid.description}
                            </p>
                            {Object.keys(grid.action).length > 0 ? (
                                <a 
                                    href={grid.action.link} 
                                    className="trip-at-a-glance__grid-item-link"
                                >
                                    {grid.action.label} →
                                </a>
                            ) : (
                                <span className="trip-at-a-glance__grid-item-no-link"></span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TripAtGlance;