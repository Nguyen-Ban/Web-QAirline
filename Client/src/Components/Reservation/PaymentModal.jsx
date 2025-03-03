import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Payment method icons (you can replace these with actual SVG icons)
const PaymentIcons = {
    credit: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
    ),
    paypal: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 12.5l1.25-5h4.5a3.75 3.75 0 1 1 0 7.5h-5.5l1-2.5h3.5a1.25 1.25 0 1 0 0-2.5h-3l-.75 3.5h3.5l1 2.5H4l2-8h4.5a3.75 3.75 0 1 1 0 7.5h-2.5z"></path>
        </svg>
    ),
    apple: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.76c0 4.17 3 12.22 6 12.22 1.25 0 2.5-1.06 4-1.06z"></path>
        </svg>
    )
};

const PaymentModal = ({
    isOpen,
    onClose,
    reservationDetails,
    totalPrice
}) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit');

    const paymentMethods = [
        { 
            id: 'credit', 
            name: 'Credit Card', 
            icon: PaymentIcons.credit 
        },
        { 
            id: 'paypal', 
            name: 'PayPal', 
            icon: PaymentIcons.paypal 
        },
        { 
            id: 'apple', 
            name: 'Apple Pay', 
            icon: PaymentIcons.apple 
        }
    ];

    const handleConfirmPayment = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/users/reservations', reservationDetails, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log('Reservation Response:', response.data);
            alert('Reservation successful! Your booking reference is: ' + response.data.id);

            // Reset state and close modal
            onClose();
        } catch (error) {
            console.error('Reservation error:', error);
            alert('Reservation failed. ' + (error.response?.data?.error || 'Please check your details and try again.'));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="payment-modal-overlay">
            <div className="payment-modal">
                <button className="close-modal" onClick={onClose}>
                    &times;
                </button>
                <h2>Complete Your Booking</h2>
                
                <div className="payment-summary">
                    <div className="summary-item">
                        <span>Total Amount</span>
                        <strong>USD {(totalPrice * (1 + 0.22 + 0.12)).toFixed(2)}</strong>
                    </div>
                </div>

                <div className="payment-method-selector">
                    <h3>Select Payment Method</h3>
                    <div className="payment-tabs">
                        {paymentMethods.map((method) => (
                            <div 
                                key={method.id}
                                className={`payment-tab ${selectedPaymentMethod === method.id ? 'active' : ''}`}
                                onClick={() => setSelectedPaymentMethod(method.id)}
                            >
                                <div className="payment-tab-icon">
                                    {method.icon}
                                </div>
                                <span>{method.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="payment-details">
                    {selectedPaymentMethod === 'credit' && (
                        <div className="credit-card-form">
                            <input 
                                type="text" 
                                placeholder="Card Number" 
                                className="payment-input" 
                            />
                            <div className="card-details">
                                <input 
                                    type="text" 
                                    placeholder="Expiry (MM/YY)" 
                                    className="payment-input" 
                                />
                                <input 
                                    type="text" 
                                    placeholder="CVV" 
                                    className="payment-input" 
                                />
                            </div>
                        </div>
                    )}
                    {selectedPaymentMethod === 'paypal' && (
                        <div className="paypal-details">
                            <p>You will be redirected to PayPal to complete your payment.</p>
                        </div>
                    )}
                    {selectedPaymentMethod === 'apple' && (
                        <div className="apple-pay-details">
                            <p>Complete payment using Apple Pay on your device.</p>
                        </div>
                    )}
                </div>

                <button 
                    className="confirm-payment-btn"
                    onClick={handleConfirmPayment}
                >
                    Confirm Payment
                </button>
            </div>
        </div>
    );
};

PaymentModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    reservationDetails: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        flightId: PropTypes.number,
        returnFlightId: PropTypes.number,
        totalPrice: PropTypes.number,
        outboundSeatId: PropTypes.string,
        returnSeatId: PropTypes.string
    }),
    totalPrice: PropTypes.number.isRequired
};

PaymentModal.defaultProps = {
    reservationDetails: null
};

export default PaymentModal;