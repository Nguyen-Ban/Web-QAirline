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
                            <div className="outbound-flight">
                                <h3>Outbound Flight</h3>
                                <div className="flight-detail-row">
                                    <strong>Flight Number:</strong> 
                                    <span>{flightDetails.outbound.flightNumber}</span>
                                </div>
                                <div className="flight-detail-row">
                                    <strong>Departure:</strong> 
                                    <span>{flightDetails.outbound.departureLocation}</span>
                                </div>
                                <div className="flight-detail-row">
                                    <strong>Departure Date/Time:</strong> 
                                    <span>{flightDetails.outbound.departureDate} {flightDetails.outbound.departureTime}</span>
                                </div>
                                <div className="flight-detail-row">
                                    <strong>Arrival:</strong> 
                                    <span>{flightDetails.outbound.arrivalLocation}</span>
                                </div>
                                <div className="flight-detail-row">
                                    <strong>Arrival Date/Time:</strong> 
                                    <span>{flightDetails.outbound.arrivalDate} {flightDetails.outbound.arrivalTime}</span>
                                </div>
                            </div>

                            {flightDetails.return && (
                                <div className="return-flight">
                                    <h3>Return Flight</h3>
                                    <div className="flight-detail-row">
                                        <strong>Flight Number:</strong> 
                                        <span>{flightDetails.return.flightNumber}</span>
                                    </div>
                                    <div className="flight-detail-row">
                                        <strong>Departure:</strong> 
                                        <span>{flightDetails.return.departureLocation}</span>
                                    </div>
                                    <div className="flight-detail-row">
                                        <strong>Departure Date/Time:</strong> 
                                        <span>{flightDetails.return.departureDate} {flightDetails.return.departureTime}</span>
                                    </div>
                                    <div className="flight-detail-row">
                                        <strong>Arrival:</strong> 
                                        <span>{flightDetails.return.arrivalLocation}</span>
                                    </div>
                                    <div className="flight-detail-row">
                                        <strong>Arrival Date/Time:</strong> 
                                        <span>{flightDetails.return.arrivalDate} {flightDetails.return.arrivalTime}</span>
                                    </div>
                                </div>
                            )}
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
        outbound: PropTypes.shape({
            departureLocation: PropTypes.string.isRequired,
            departureDate: PropTypes.string.isRequired,
            departureTime: PropTypes.string.isRequired,
            arrivalLocation: PropTypes.string.isRequired,
            arrivalDate: PropTypes.string.isRequired,
            arrivalTime: PropTypes.string.isRequired,
            flightNumber: PropTypes.string.isRequired
        }).isRequired,
        return: PropTypes.shape({
            departureLocation: PropTypes.string.isRequired,
            departureDate: PropTypes.string.isRequired,
            departureTime: PropTypes.string.isRequired,
            arrivalLocation: PropTypes.string.isRequired,
            arrivalDate: PropTypes.string.isRequired,
            arrivalTime: PropTypes.string.isRequired,
            flightNumber: PropTypes.string.isRequired
        })
    }).isRequired
};

export default ReservationSuccessModal;