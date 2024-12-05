import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdFlightTakeoff } from "react-icons/md";
import { FaUser, FaArrowRight } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { PiSeatFill } from "react-icons/pi";
import { IoMdSwap } from "react-icons/io";

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

    const [sortOption, setSortOption] = useState('cheapest');
    const [uniqueDepartures, setUniqueDepartures] = useState([]);
    const [uniqueDestinations, setUniqueDestinations] = useState([]);
    const [searchError, setSearchError] = useState('');
    const [isPassengerDropdownOpen, setIsPassengerDropdownOpen] = useState(false);

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

    // Determine flights to render (pre-/post-search)
    const displayFlights = filteredFlights.length > 0
        ? sortFlights(filteredFlights)
        : sortFlights(flights);

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


            {/* Flights Grid */}
            <div className="flights-grid">
                {displayFlights.length === 0 ? (
                    <div className="no-flights-message">
                        No flights found matching your search criteria.
                    </div>
                ) : (
                    displayFlights.map(flight => (
                        <div key={flight.id} className="flight-card">
                            <div className="flight-details">
                                <div className="flight-route-section">
                                    <div className="flight-route">
                                        <span className="departure-city">{flight.departure}</span>
                                        <span className="route-arrow"> <FaArrowRight /></span>
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
                                        <div className="seat-capacity">
                                            <span>Seat Capacity:</span>
                                            <span>{flight.plane.seatCapacity}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flight-price-section">
                                    {flight.prices.find(p => p.class.toLowerCase() === searchParams.travelClass.toLowerCase()) && (
                                        <div className="selected-class-price">
                                            <span>{searchParams.travelClass} Class:</span>
                                            <span>
                                                ${flight.prices.find(p => p.class.toLowerCase() === searchParams.travelClass.toLowerCase()).price}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FlightSearch;