import { useState, useEffect } from 'react';
import axios from 'axios';

const MyBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper function to convert seat ID back to seat number
    const convertSeatIdToSeat = (planeId, seatId) => {
        const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const baseSeatId = (planeId - 1) * 80 + 1;

        const relativeSeatId = seatId - baseSeatId;
        const letterIndex = Math.floor(relativeSeatId / 10);
        const rowNumber = (relativeSeatId % 10) + 1;

        return `${seatLetters[letterIndex]}${rowNumber}`;
    };

    // Format date and time
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            boardTime: new Date(date.getTime() - 30 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // Get user ID from local storage
                const userId = localStorage.getItem('user');

                if (!userId) {
                    throw new Error('No user ID found in local storage');
                }

                // Fetch reservations for the user
                const reservationsResponse = await axios.get(`http://localhost:4000/api/users/reservations`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                // Fetch flights information
                const flightsResponse = await axios.get('http://localhost:4000/api/users/flights');

                // Process bookings
                const userBookings = reservationsResponse.data.map(reservation => {
                    // Find corresponding flight
                    const flight = flightsResponse.data.find(f => f.id === reservation.flightId);

                    if (!flight) return null;

                    // Find seat details
                    const seatDetails = flight.plane && flight.plane.id
                        ? convertSeatIdToSeat(flight.plane.id, reservation.seatId)
                        : 'N/A';

                    const { date, time, boardTime } = formatDateTime(flight.departureTime);

                    return {
                        ...reservation,
                        flightNumber: flight.flightNumber,
                        departure: flight.departure,
                        destination: flight.destination,
                        planeModel: flight.plane ? flight.plane.model : 'N/A',
                        departureDate: date,
                        departureTime: time,
                        arrivalDate: date,
                        arrivaleTime: time,
                        boardTime: boardTime,
                        seatNumber: seatDetails
                    };
                }).filter(booking => booking !== null);

                setBookings(userBookings);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) return <div className="my-booking-loading">Loading bookings...</div>;
    if (error) return <div className="my-booking-error">Error: {error}</div>;

    return (
        <div className="my-booking-container">
            <h1>My Bookings</h1>
            {bookings.length === 0 ? (
                <div className="no-bookings">No bookings found</div>
            ) : (
                <div className="booking-grid">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="booking-ticket">
                            <div className="ticket-header">
                                <div className="flight-number">{booking.flightNumber}</div>
                                <div className="ticket-status">{booking.status}</div>
                            </div>
                            <div className="ticket-details">
                                <div className="route">
                                    <div className="departure">
                                        <span className="label">From</span>
                                        <span className="city">{booking.departure}</span>
                                    </div>
                                    <div className="arrow">→</div>
                                    <div className="arrival">
                                        <span className="label">To</span>
                                        <span className="city">{booking.destination}</span>
                                    </div>
                                </div>
                                <div className="flight-info">
                                    <div className="time-details">
                                        <div className="departure-time">
                                            <span className="label">Departure: </span>
                                            <span className="datetime">{booking.departureDate} {booking.departureTime}</span>
                                        </div>
                                        <div className="board-time">
                                            <span className="label">Board Time: </span>
                                            <span className="time">{booking.boardTime}</span>
                                        </div>
                                        
                                        <div className="seat-info">
                                            <span className="label">Seat: </span>
                                            <span className="number">{booking.seatNumber}</span>
                                        </div>
                                    </div>
                                    <div className="additional-details">
                                        <div className="arrival-time">
                                            <span className="label">Arrival: </span>
                                            <span className="datetime">{booking.arrivalDate} {booking.arrivaleTime}</span>
                                        </div>
                                        <div className="plane-model">{booking.planeModel}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="ticket-footer">
                                <div className="reservation-id">
                                    Reservation ID: {booking.id}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBooking;