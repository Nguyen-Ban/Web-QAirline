//import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ReservationSuccessModal = ({ 
    isOpen, 
    onClose, 
    bookingReference, 
    flightDetails 
}) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleViewBookings = () => {
        navigate('/my-booking');
    };

    return (
        <div className="reservation-success-modal-overlay">
            <div className="reservation-success-modal">
                <div className="modal-header">
                    <h2>Reservation Confirmed</h2>
                    <div className="checkmark-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div className="modal-content">
                    <div className="booking-info">
                        <div className="booking-reference">
                            <span>Booking Reference:</span>
                            <strong>{bookingReference}</strong>
                        </div>
                        <div className="flight-details">
                            <div className="departure-info">
                                <h3>Departure</h3>
                                <p>{flightDetails.departureLocation}</p>
                                <p>{flightDetails.departureDate}</p>
                            </div>
                            <div className="arrival-info">
                                <h3>Arrival</h3>
                                <p>{flightDetails.arrivalLocation}</p>
                                <p>{flightDetails.arrivalDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-actions">
                    <button 
                        className="close-btn" 
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button 
                        className="view-bookings-btn" 
                        onClick={handleViewBookings}
                    >
                        View My Bookings
                    </button>
                </div>
            </div>
        </div>
    );
};

ReservationSuccessModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    bookingReference: PropTypes.string.isRequired,
    flightDetails: PropTypes.shape({
        departureLocation: PropTypes.string.isRequired,
        departureDate: PropTypes.string.isRequired,
        arrivalLocation: PropTypes.string.isRequired,
        arrivalDate: PropTypes.string.isRequired
    }).isRequired
};

export default ReservationSuccessModal;