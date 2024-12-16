import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyTrip = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4000/api/trips', {
                    headers: { 
                        'Authorization': `Bearer ${token}` 
                    }
                });
                setTrips(response.data);
            } catch (error) {
                setError('Error fetching trips');
                console.error('Error fetching trips:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="myTrip">
            <h1>My Trips</h1>
            {trips.length === 0 ? (
                <p>No trips found</p>
            ) : (
                <ul className="tripList">
                    {trips.map(trip => (
                        <li key={trip.id} className="tripItem">
                            <p>Flight Number: {trip.flightNumber}</p>
                            <p>Departure: {trip.departure}</p>
                            <p>Destination: {trip.destination}</p>
                            <p>Departure Time: {new Date(trip.departureTime).toLocaleString()}</p>
                            <p>Arrival Time: {new Date(trip.arrivalTime).toLocaleString()}</p>
                            <p>Status: {trip.status}</p>
                            <p>Plane Model: {trip.plane.model}</p>
                            <p>Manufacturer: {trip.plane.manufacturer}</p>
                            <p>Seat Capacity: {trip.plane.seatCapacity}</p>
                            <Link to={`/trip/${trip.id}`}>View Details</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyTrip;
