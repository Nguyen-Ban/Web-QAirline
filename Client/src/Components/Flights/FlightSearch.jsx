import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdFlightTakeoff } from "react-icons/md";
//import { FaUser, FaArrowRight } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { PiSeatFill } from "react-icons/pi";
import { IoMdSwap } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { HiMiniLockClosed } from "react-icons/hi2";

import cancel from "../../assets/cancel.png";
import arrow from "../../assets/flights_grid_arrow.png";

const FlightSearch = () => {
    // State management
    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [searchParams, setSearchParams] = useState({
        departure: '',
        destination: '',
        tripType: 'oneway',
        departureDate: '',
        returnDate: '',
        adults: 1,
        children: 0,
        travelClass: 'Economy'
    });

    const [selectedOutboundFlights, setSelectedOutboundFlights] = useState([]);
    //const [selectedOutboundFlight, setSelectedOutboundFlight] = useState(null);
    const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);
    const [isSelectingReturnFlight, setIsSelectingReturnFlight] = useState(false);
    const [showReturnFlightModal, setShowReturnFlightModal] = useState(false);

    const [sortOption, setSortOption] = useState('cheapest');
    const [uniqueDepartures, setUniqueDepartures] = useState([]);
    const [uniqueDestinations, setUniqueDestinations] = useState([]);
    const [searchError, setSearchError] = useState('');
    const [isPassengerDropdownOpen, setIsPassengerDropdownOpen] = useState(false);

    const [showBookingTypeModal, setShowBookingTypeModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [selectedFlightInfo, setSelectedFlightInfo] = useState({
        outboundFlights: [],
        returnFlight: null
    });

    // Initial data load
    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/users/flights');

                if (response.data && response.data.length > 0) {
                    // Set all flights
                    setFlights(response.data);

                    // Extract unique departure and destination values directly from flight data
                    const departures = [...new Set(response.data.map(flight => flight.departure))];
                    const destinations = [...new Set(response.data.map(flight => flight.destination))];

                    // Sort the unique locations alphabetically
                    setUniqueDepartures(departures.sort());
                    setUniqueDestinations(destinations.sort());
                }
            } catch (error) {
                console.error('Error fetching flights:', error);
            }
        };

        fetchFlights();
    }, []);

    // Passenger count adjustment
    const adjustPassengerCount = (type, increment) => {
        setSearchParams(prev => {
            const currentCount = prev[type];
            const maxCount = type === 'adults' ? 10 : 5;

            // Calculate new count
            const newCount = increment
                ? Math.min(currentCount + 1, maxCount)
                : Math.max(currentCount - 1, 0);

            return {
                ...prev,
                [type]: newCount
            };
        });
    };

    // Search parameter change handler
    const handleSearchParamChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear any previous search errors
        setSearchError('');
    };

    // Swap departure and destination
    const swapDepartureDestination = () => {
        setSearchParams(prev => ({
            ...prev,
            departure: prev.destination,
            destination: prev.departure
        }));
    };

    // Search flights
    const searchFlights = async () => {
        // Validate search parameters
        if (!searchParams.departure || !searchParams.destination) {
            setSearchError('Please select both departure and destination.');
            return;
        }

        try {
            // Prepare query parameters
            const queryParams = {
                departure: searchParams.departure,
                destination: searchParams.destination,
                tripType: searchParams.tripType,
                travelClass: searchParams.travelClass,
                ...(searchParams.departureDate && { departureDate: searchParams.departureDate }),
                ...(searchParams.tripType === 'roundtrip' && searchParams.returnDate && { returnDate: searchParams.returnDate })
            };

            // Make API call
            const response = await axios.get('http://localhost:4000/api/users/flights/search', {
                params: queryParams
            });

            // Update filtered flights
            if (response.data.length === 0) {
                setSearchError('No flights found matching your search criteria.');
                setFilteredFlights([]);
            } else {
                setFilteredFlights(response.data);
                setSearchError('');
            }
        } catch (error) {
            console.error('Error searching flights:', error);
            setSearchError(error.response?.data?.error || 'Failed to search flights. Please try again.');
            setFilteredFlights([]);
        }
    };

    // Sort option change handler
    // const handleSortChange = (e) => {
    //     setSortOption(e.target.value);
    // };

    // Sort flights
    const sortFlights = (flightsToSort) => {
        return flightsToSort.sort((a, b) => {
            switch (sortOption) {
                case 'cheapest': {
                    // Find the price for the selected travel class
                    const getPriceForClass = (flight) => {
                        const priceObj = flight.prices.find(p => p.class.toLowerCase() === searchParams.travelClass.toLowerCase());
                        return priceObj ? priceObj.price : Infinity;
                    };
                    return getPriceForClass(a) - getPriceForClass(b);
                }
                case 'departure': {
                    return new Date(a.departureTime) - new Date(b.departureTime);
                }
                case 'arrival': {
                    return new Date(a.arrivalTime) - new Date(b.arrivalTime);
                }
                case 'duration': {
                    const aDuration = new Date(a.arrivalTime) - new Date(a.departureTime);
                    const bDuration = new Date(b.arrivalTime) - new Date(b.departureTime);
                    return aDuration - bDuration;
                }
                default: {
                    return 0;
                }
            }
        });
    };

    // Flights rendering logic modification
    const calculateTotalPrice = (flight) => {

        const priceEntry = flight.prices.find(p => p.class.toLowerCase() === searchParams.travelClass.toLowerCase());
        if (!priceEntry) return 0;

        // Calculate price for adults
        const adultPrice = priceEntry.price * searchParams.adults;

        // Calculate price for children (70% of adult price)
        const childPrice = priceEntry.price * 0.7 * searchParams.children;

        return adultPrice + childPrice;
    };

    const calculateTotalTripPrice = () => {
        const calculateClassPrice = (flight) => {
            const priceEntry = flight.prices.find(
                p => p.class.toLowerCase() === searchParams.travelClass.toLowerCase()
            );
            if (!priceEntry) return 0;

            const adultPrice = parseFloat(priceEntry.price) * searchParams.adults;
            const childPrice = parseFloat(priceEntry.price) * 0.7 * searchParams.children;

            return adultPrice + childPrice;
        };

        // 최신 선택된 출발편 기반 계산
        const outboundPrice = selectedFlightInfo.outboundFlights.length > 0
            ? calculateClassPrice(selectedFlightInfo.outboundFlights[selectedFlightInfo.outboundFlights.length - 1])
            : 0;

        // 돌아오는 편 가격 계산 (왕복 여정인 경우)
        const returnPrice = (searchParams.tripType === 'roundtrip' && selectedFlightInfo.returnFlight)
            ? calculateClassPrice(selectedFlightInfo.returnFlight)
            : 0;

        return outboundPrice + returnPrice;
    };

    const handleFlightSelect = (flight) => {
        if (!isSelectingReturnFlight) {
            // For round trip, allow multiple outbound flight selections
            if (searchParams.tripType === 'roundtrip') {
                /*setSelectedOutboundFlights(prev => {
                    const isAlreadySelected = prev.some(f => f.id === flight.id);
                    const updatedFlights = isAlreadySelected
                        ? prev.filter(f => f.id !== flight.id)
                        : [...prev, flight];

                    // selectedFlightInfo 업데이트
                    setSelectedFlightInfo(prev => ({
                        ...prev,
                        outboundFlights: updatedFlights
                    }));

                    return updatedFlights;
                });*/
                setSelectedOutboundFlights([flight]); // 마지막 선택된 항공편만 저장

                setSelectedFlightInfo(prev => ({
                    ...prev,
                    outboundFlights: [flight], // 마지막 선택된 항공편만 저장
                }));
            } else {
                // 편도 여정의 출발편 선택 로직
                setSelectedOutboundFlights([flight]);
                setSelectedFlightInfo(prev => ({
                    ...prev,
                    outboundFlights: [flight],
                }));
            }
        } else {
            // 돌아오는 편 선택 로직
            setSelectedReturnFlight(flight);
            setSelectedFlightInfo(prev => ({
                ...prev,
                returnFlight: flight,
            }));
            setIsSelectingReturnFlight(false);
        }
    };

    const handleSelectReturnFlightClick = () => {
        if (selectedOutboundFlights.length === 0) {
            // 출발편 미선택 시 모달 표시
            setShowReturnFlightModal(true);
            return;
        }

        // 가장 최근에 선택된 출발 항공편 
        const latestOutboundFlight = selectedOutboundFlights[selectedOutboundFlights.length - 1];

        // 돌아오는 편 선택 모드로 전환
        setIsSelectingReturnFlight(true);

        // 필터링된 항공편과 오류 초기화
        setFilteredFlights([]);
        setSearchError('');

        // 돌아오는 항공편 검색
        const searchReturnFlights = async () => {
            try {
                const queryParams = {
                    departure: latestOutboundFlight.destination,  // 출발지와 도착지 반대로
                    destination: latestOutboundFlight.departure,
                    departureDate: searchParams.returnDate,      // 돌아오는 날짜 추가
                    tripType: 'oneway'
                };

                const response = await axios.get('http://localhost:4000/api/users/flights/search', {
                    params: queryParams
                });

                // 돌아오는 항공편이 있는 경우에만 필터링
                if (response.data && response.data.length > 0) {
                    setFilteredFlights(response.data);
                } else {
                    // 돌아오는 항공편이 없는 경우 에러 메시지 
                    setSearchError('No return flights found for the selected date and route.');
                    setFilteredFlights([]);
                }
            } catch (error) {
                console.error('Error searching return flights:', error);
                setSearchError('Failed to search return flights. Please try again.');
                setFilteredFlights([]);
            }
        };

        searchReturnFlights();
    };

    const getAvailableSeatCount = (flight) => {
        const seatCountEntry = flight.prices.find(p => p.class.toLowerCase() === searchParams.travelClass.toLowerCase());
        return seatCountEntry ? seatCountEntry.seatCount : 0;
    };

    const handleProceedToBooking = () => {
        setShowBookingTypeModal(true);
        // 선택된 모든 항공편 정보를 localStorage에 저장
        localStorage.setItem('selectedFlightInfo', JSON.stringify(selectedFlightInfo));

        // 총 여행 가격을 localStorage에 저장
        const totalTripPrice = calculateTotalTripPrice();
        localStorage.setItem('totalTripPrice', totalTripPrice.toString());

        // 여행 클래스 저장
        localStorage.setItem('travelClass', searchParams.travelClass);

        // 승객 수 저장
        localStorage.setItem('adults', searchParams.adults.toString());
        localStorage.setItem('children', searchParams.children.toString());

    };

    const handleBookingTypeSelect = (type) => {
        localStorage.setItem('bookingType', type);
        if (type === 'member') {
            // Check if user is logged in
            const token = localStorage.getItem('token');
            if (token) {
                // Directly navigate to reservation page
                window.location.href = '/reservation';
            } else {
                // Show login modal
                setShowLoginModal(true);
            }
        } else {
            // Non-member booking
            window.location.href = '/reservation';
        }
        setShowBookingTypeModal(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', {
                email: loginEmail,
                password: loginPassword
            });
            localStorage.setItem('token', response.data.token);
            setShowLoginModal(false);
            if (response.data.userId) {
                localStorage.setItem('user', response.data.userId.toString());
            }
            window.location.href = '/reservation';
        } catch (err) {
            console.log('Error message:', err);
            setLoginError('Invalid credentials');
        }
    };

    // Determine flights to render (pre-/post-search)
    const displayFlights = isSelectingReturnFlight
        ? filteredFlights
        : (filteredFlights.length > 0
            ? sortFlights(filteredFlights)
            : sortFlights(flights));

    return (
        <div className="flight-search-container">
            <div className="search-section">
                <div className="search-inputs">
                    <div className="first-row">
                        {/* Trip Type Dropdown */}
                        <div className="trip-type-dropdown">
                            <MdFlightTakeoff />
                            <select
                                name="tripType"
                                value={searchParams.tripType}
                                onChange={handleSearchParamChange}
                            >
                                <option value="oneway">One Way</option>
                                <option value="roundtrip">Round Trip</option>
                            </select>
                        </div>

                        {/* Passenger Dropdown */}
                        <div
                            className="passenger-dropdown"
                            onClick={() => setIsPassengerDropdownOpen(!isPassengerDropdownOpen)}
                        >
                            <FaUser />
                            <span>
                                {searchParams.adults} Adult, {searchParams.children} Child
                            </span>
                            {isPassengerDropdownOpen && (
                                <div className="passenger-selector">
                                    <div className="passenger-type">
                                        <span>Adult</span>
                                        <div className="counter">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    adjustPassengerCount('adults', false);
                                                }}
                                                disabled={searchParams.adults <= 1}
                                            >
                                                -
                                            </button>
                                            <span>{searchParams.adults}</span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    adjustPassengerCount('adults', true);
                                                }}
                                                disabled={searchParams.adults >= 10}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="passenger-type">
                                        <span>Child</span>
                                        <div className="counter">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    adjustPassengerCount('children', false);
                                                }}
                                                disabled={searchParams.children <= 0}
                                            >
                                                -
                                            </button>
                                            <span>{searchParams.children}</span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    adjustPassengerCount('children', true);
                                                }}
                                                disabled={searchParams.children >= 5}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Travel Class Dropdown */}
                        <div className="class-dropdown">
                            <PiSeatFill />
                            <select
                                name="travelClass"
                                value={searchParams.travelClass}
                                onChange={handleSearchParamChange}
                            >
                                <option value="Economy">Economy</option>
                                <option value="Business">Business</option>
                                <option value="First">First</option>
                            </select>
                        </div>
                    </div>

                    <div className="second-row">
                        {/* Departure and Destination Selects */}
                        <select
                            name="departure"
                            value={searchParams.departure}
                            onChange={handleSearchParamChange}

                        >
                            <option value="">From</option>
                            {uniqueDepartures.map(departure => (
                                <option key={departure} value={departure}>{departure}</option>
                            ))}
                        </select>

                        <div className="swap-icon" onClick={swapDepartureDestination}>
                            <IoMdSwap />
                        </div>

                        <select
                            name="destination"
                            value={searchParams.destination}
                            onChange={handleSearchParamChange}
                        >
                            <option value="">To</option>
                            {uniqueDestinations.map(destination => (
                                <option key={destination} value={destination}>{destination}</option>
                            ))}
                        </select>

                    </div>
                    {/* Date Inputs */}
                    <input
                        type="date"
                        name="departureDate"
                        value={searchParams.departureDate}
                        onChange={handleSearchParamChange}
                        placeholder="Departure Date"
                        className="date-input"
                    />

                    {searchParams.tripType === 'roundtrip' && (
                        <input
                            type="date"
                            name="returnDate"
                            value={searchParams.returnDate}
                            onChange={handleSearchParamChange}
                            placeholder="Return Date"
                            className="date-input"
                        />
                    )}

                    {/* Search Button */}
                    <button onClick={searchFlights} className="search-btn">
                        <IoSearchSharp />
                        Search
                    </button>

                    {searchError && (
                        <div className="search-error-message">
                            {searchError}
                        </div>
                    )}
                </div>
            </div>

            {/* Sort Options */}
            <div className="sort-options">
                <button
                    onClick={() => setSortOption('cheapest')}
                    className={sortOption === 'cheapest' ? 'active' : ''}
                    aria-label="Sort by cheapest"
                >
                    Cheapest
                </button>
                <button
                    onClick={() => setSortOption('departure')}
                    className={sortOption === 'departure' ? 'active' : ''}
                    aria-label="Sort by departure time"
                >
                    Departure Time
                </button>
                <button
                    onClick={() => setSortOption('arrival')}
                    className={sortOption === 'arrival' ? 'active' : ''}
                    aria-label="Sort by arrival time"
                >
                    Arrival Time
                </button>
                <button
                    onClick={() => setSortOption('duration')}
                    className={sortOption === 'duration' ? 'active' : ''}
                    aria-label="Sort by flight duration"
                >
                    Flight Duration
                </button>
            </div>

            {showReturnFlightModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Notification</h2>
                        <p>lease choose the departure flight first.</p>
                        <button onClick={() => setShowReturnFlightModal(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Flights Grid */}
            <div className="flights-grid">
                {displayFlights.length === 0 ? (
                    <div className="no-flights-message">
                        No flights found matching your search criteria.
                    </div>
                ) : (
                    displayFlights.map(flight => (
                        <div
                            key={flight.id}
                            className={`flight-card ${(isSelectingReturnFlight && selectedReturnFlight?.id === flight.id) ||
                                (!isSelectingReturnFlight &&
                                    selectedOutboundFlights.some(f => f.id === flight.id))
                                ? 'selected-flight'
                                : ''
                                }`}
                            onClick={() => handleFlightSelect(flight)}
                        >
                            <div className="flight-details">
                                <div className="flight-route-section">
                                    <div className="flight-route">
                                        <span className="departure-city">{flight.departure}</span>
                                        {/*<span className="route-arrow"> <FaArrowRight /></span>*/}
                                        <img src={arrow} alt="Arrow" className="arrow-image" />
                                        <span className="destination-city">{flight.destination}</span>
                                    </div>
                                    <div className="flight-times">
                                        <div className="departure-time">
                                            <span>Departure:</span>
                                            <span>{flight.departureTime
                                                ? new Date(flight.departureTime).toLocaleString()
                                                : 'Not Available'}</span>
                                        </div>
                                        <div className="arrival-time">
                                            <span>Arrival:</span>
                                            <span>{flight.arrivalTime
                                                ? new Date(flight.arrivalTime).toLocaleString()
                                                : 'Not Available'}</span>
                                        </div>
                                    </div>
                                    <div className="flight-info">
                                        <div className="plane-details">
                                            <span>Aircraft:</span>
                                            <span>{/*flight.plane.manufacturer*/} {flight.plane.model}</span>
                                        </div>
                                        <div className="seat-count">
                                            <span>Available {searchParams.travelClass} Seats: </span>
                                            <span>{getAvailableSeatCount(flight)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flight-price-section">
                                    {flight.prices.find(p => p.class.toLowerCase() === searchParams.travelClass.toLowerCase()) && (
                                        <div className="selected-class-price">
                                            <span>{searchParams.travelClass} Class:</span>
                                            <div>
                                                <span>Total Price: ${calculateTotalPrice(flight).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {showBookingTypeModal && (
                <div className="booking-type-modal">
                    <div className="booking-type-content">
                        <img
                            src={cancel}
                            alt="Cancel"
                            className="close-modal-btn"
                            onClick={() => setShowBookingTypeModal(false)}
                        />
                        <div
                            className="booking-type-left"
                            onClick={() => handleBookingTypeSelect('member')}
                        >
                            <h2>Member Booking</h2>
                            <p>Book as a registered member with personalized benefits and exclusive perks</p>
                        </div>
                        <div
                            className="booking-type-right"
                            onClick={() => handleBookingTypeSelect('nonmember')}
                        >
                            <h2>Non-Member Booking</h2>
                            <p>Quick and easy booking without registration process</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Login Modal */}
            {showLoginModal && (
                <div className="login-modal">
                    <div className="login-modal-content">
                        <img src={cancel} alt="Cancel" className="close-modal-btn" onClick={() => setShowLoginModal(false)} />
                        <h2>Sign in</h2>
                        {loginError && <div className="error-message">{loginError}</div>}
                        <form onSubmit={handleLogin}>
                            <div className="input-group">
                                <HiOutlineMail className="icon" />
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    placeholder="Enter your Password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                />
                                <HiMiniLockClosed className="icon" />
                            </div>
                            <button type="submit" className="login-btn">
                                Login
                            </button>
                            <p className="create-account">
                                No Account yet? <a href="/register">Register</a>
                            </p>
                        </form>
                        <button
                            className="close-modal-btn"
                            onClick={() => setShowLoginModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}


            {(selectedOutboundFlights.length > 0 || selectedReturnFlight) && (
                <div className="booking-navbar">
                    <div className="total-price">
                        Total Price: ${calculateTotalTripPrice().toFixed(2)}
                    </div>
                    {searchParams.tripType === 'roundtrip' && !selectedReturnFlight && (
                        <button
                            className="select-return-flight-btn"
                            onClick={handleSelectReturnFlightClick}
                            disabled={selectedOutboundFlights.length === 0}
                        >
                            Select Return Flight
                        </button>
                    )}
                    {selectedOutboundFlights.length > 0 && (selectedReturnFlight || searchParams.tripType === 'oneway') && (
                        <button className="proceed-to-booking-btn"
                            onClick={handleProceedToBooking}>
                            Proceed to Booking
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default FlightSearch;