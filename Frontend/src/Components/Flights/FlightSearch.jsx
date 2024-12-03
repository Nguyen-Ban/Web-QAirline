import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdSwap } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";

const FlightSearch = () => {
    // State management
    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [searchParams, setSearchParams] = useState({
        departure: '',
        destination: '',
        tripType: 'oneway',
        departureDate: '',
        returnDate: ''
    });
    const [sortOption, setSortOption] = useState('departure_asc');
    const [uniqueDepartures, setUniqueDepartures] = useState([]);
    const [uniqueDestinations, setUniqueDestinations] = useState([]);
    const [searchError, setSearchError] = useState('');

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
                // Log the error, but don't set an error message
            }
        };

        fetchFlights();
    }, []);

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
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    // Sort flights
    const sortFlights = (flightsToSort) => {
        return flightsToSort.sort((a, b) => {
            switch (sortOption) {
                case 'departure_asc':
                    return new Date(a.departureTime) - new Date(b.departureTime);
                case 'departure_desc':
                    return new Date(b.departureTime) - new Date(a.departureTime);
                case 'duration_asc': {
                    const aDuration = new Date(a.arrivalTime) - new Date(a.departureTime);
                    const bDuration = new Date(b.arrivalTime) - new Date(b.departureTime);
                    return aDuration - bDuration;
                }
                default:
                    return 0;
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
                    <div className="departure-destination-wrapper">
                        <select
                            name="departure"
                            value={searchParams.departure}
                            onChange={handleSearchParamChange}
                            className="departure-select"
                        >
                            <option value="">Select Departure</option>
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
                            className="destination-select"
                        >
                            <option value="">Select Destination</option>
                            {uniqueDestinations.map(destination => (
                                <option key={destination} value={destination}>{destination}</option>
                            ))}
                        </select>
                    </div>

                    <select
                        name="tripType"
                        value={searchParams.tripType}
                        onChange={handleSearchParamChange}
                        className="trip-type-select"
                    >
                        <option value="oneway">One Way</option>
                        <option value="roundtrip">Round Trip</option>
                    </select>

                    <input
                        type="date"
                        name="departureDate"
                        value={searchParams.departureDate}
                        onChange={handleSearchParamChange}
                        className="departure-date"
                    />

                    {searchParams.tripType === 'roundtrip' && (
                        <input
                            type="date"
                            name="returnDate"
                            value={searchParams.returnDate}
                            onChange={handleSearchParamChange}
                            className="return-date"
                        />
                    )}

                    {searchError && (
                        <div className="search-error-message">
                            {searchError}
                        </div>
                    )}

                    <button onClick={searchFlights} className="search-button">Search</button>
                </div>

                <div className="sort-section">
                    <p className="sort-by">Sort by: </p>
                    <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className="sort-select"
                    >
                        <option value="departure_asc">Earliest Departure</option>
                        <option value="departure_desc">Latest Departure</option>
                        <option value="duration_asc">Shortest Flight Duration</option>
                    </select>
                </div>
            </div>

            <div className="flights-grid">
                {displayFlights.map(flight => (
                    <div key={flight.id} className="flight-card">
                        <div className="flight-details">
                            <div className="flight-route">
                                <span className="departure-city">{flight.departure}</span>
                                <span className="route-arrow"> <FaArrowRight /></span>
                                <span className="destination-city">{flight.destination}</span>
                            </div>
                            <div className="flight-times">
                                <div className="departure-time">
                                    <span>Departure:</span>
                                    <span>{new Date(flight.departureTime).toLocaleString()}</span>
                                </div>
                                <div className="arrival-time">
                                    <span>Arrival:</span>
                                    <span>{new Date(flight.arrivalTime).toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="flight-info">
                                <div className="flight-number">
                                    <span>Flight Number:</span>
                                    <span>{flight.flightNumber}</span>
                                </div>
                                <div className="flight-status">
                                    <span>Status:</span>
                                    <span>{flight.status}</span>
                                </div>
                            </div>
                            {flight.prices && (
                                <div className="flight-prices">
                                    {flight.prices.map(price => (
                                        <div key={price.class}>
                                            <span>{price.class} Class:</span>
                                            <span>${price.price}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlightSearch;