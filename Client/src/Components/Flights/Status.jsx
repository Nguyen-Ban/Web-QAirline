import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../main.scss';

const Status = () => {
    const [flights, setFlights] = useState([]);
    const [searchParams, setSearchParams] = useState({});
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Retrieve search parameters from localStorage
        const storedParams = JSON.parse(localStorage.getItem('flightSearchParams') || '{}');
        setSearchParams(storedParams);

        // Fetch flights
        const fetchFlights = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/users/flights');
                setFlights(response.data);
            } catch (error) {
                console.error('Error fetching flights:', error);
                setErrorMessage('Unable to fetch flight information');
            }
        };

        fetchFlights();
    }, []);

    useEffect(() => {
        // Precise matching function
        const isFlightMatching = (flight) => {
            // Function to format date to YYYY-MM-DD
            const formatDate = (dateString) => {
                return new Date(dateString).toISOString().split('T')[0];
            };

            // Check flight number if specified
            const isFlightNumberMatching = searchParams.flightNumber
                ? flight.flightNumber.trim() === searchParams.flightNumber.trim()
                : true;

            // Check departure date if specified
            const isDepartureDateMatching = searchParams.departureDate
                ? formatDate(flight.departureTime) === searchParams.departureDate
                : true;

            // Check arrival date if specified
            const isArrivalDateMatching = searchParams.arrivalDate
                ? formatDate(flight.arrivalTime) === searchParams.arrivalDate
                : true;

            return isFlightNumberMatching && isDepartureDateMatching && isArrivalDateMatching;
        };

        // Filter flights
        const filtered = flights.filter(isFlightMatching);

        // Handle filtering results
        if (filtered.length > 0) {
            setFilteredFlights(filtered);
            setErrorMessage('');
        } else if (searchParams.flightNumber || searchParams.departureDate || searchParams.arrivalDate) {
            setFilteredFlights([]);
            setErrorMessage('No flights found matching your search criteria');
        } else {
            setFilteredFlights(flights);
            setErrorMessage('');
        }
    }, [flights, searchParams]);

    return (
        <div className="status container section">
            <div className="titleContainer">
                Flight Status
            </div>
            <div className="sectionContainer grid">
                <div className="statusSearchInfoContainer">
                    <div className="flightSearchInfo">
                        <div className="infoItem">
                            <strong>Flight Number:</strong> {searchParams.flightNumber || 'Not specified'}
                        </div>
                        <div className="infoItem">
                            <strong>Departure Date:</strong> {searchParams.departureDate || 'Not specified'}
                        </div>
                        <div className="infoItem">
                            <strong>Arrival Date:</strong> {searchParams.arrivalDate || 'Not specified'}
                        </div>
                    </div>
                </div>

                <div className="errorContainer" style={{
                    color: 'red',
                    marginTop: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                }}>
                    {errorMessage}
                </div>


                <div className="flightResultsContainer">
                    {filteredFlights.map(flight => (
                        <div key={flight.id} className="flightCard">
                            <div className="flightDetails">
                                <div className="flightHeader">
                                    <span className="flightNumber">{flight.flightNumber}</span>
                                    <span className="flightStatus">{flight.status}</span>
                                </div>
                                <div className="flightRoute">
                                    <span>{flight.departure}</span>
                                    <span>→</span>
                                    <span>{flight.destination}</span>
                                </div>
                                <div className="flightTimes">
                                    <div>
                                        <strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}
                                    </div>
                                    <div>
                                        <strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Status;