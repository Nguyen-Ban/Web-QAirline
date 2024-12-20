import { useState, useEffect } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import PropTypes from 'prop-types';
import ReservationSuccessModal from './ReservationSuccessModal';
import EmailVerificationModal from './EmailVerificationModal';
import CancellationModal from './CancellationModal';

import { CiCreditCard1 } from "react-icons/ci";
import { PiPaypalLogo } from "react-icons/pi";
import { FaApplePay } from "react-icons/fa6";
import { AiOutlineBank } from "react-icons/ai";

import arrow from "../../assets/flights_grid_arrow.png";

const Reservation = () => {
    const [selectedFlightInfo, setSelectedFlightInfo] = useState(null);
    const [customerInfo, setCustomerInfo] = useState({
        firstName: '',
        lastName: '',
        passportNumber: '',
        email: '',
        phone: '',
        dateOfBirth: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState({
        outbound: null,
        return: null,
    });
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [reservationDetails, setReservationDetails] = useState(null);

    const [isReservationSuccessModalOpen, setIsReservationSuccessModalOpen] = useState(false);
    const [bookingReference, setBookingReference] = useState('');
    const [successFlightDetails, setSuccessFlightDetails] = useState(null);

    // State for email verification
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isEmailVerificationModalOpen, setIsEmailVerificationModalOpen] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [sentVerificationCode, setSentVerificationCode] = useState('');
    const [isCancellationModalOpen, setIsCancellationModalOpen] = useState(false);

    useEffect(() => {
        // Retrieve flight information from localStorage
        const storedFlightInfo = JSON.parse(localStorage.getItem('selectedFlightInfo'));
        const storedBookingType = localStorage.getItem('bookingType');

        console.log('Booking Type:', storedBookingType);

        if (storedFlightInfo) {
            setSelectedFlightInfo(storedFlightInfo);
            calculateTotalPrice(storedFlightInfo);
        }
    }, []);

    const calculateTotalPrice = (flightInfo) => {
        // localStorage에서 직접 총 가격 가져오기
        const storedTotalPrice = localStorage.getItem('totalTripPrice');

        if (storedTotalPrice) {
            // 문자열로 저장된 가격을 숫자로 변환
            const parsedTotalPrice = parseFloat(storedTotalPrice);
            setTotalPrice(parsedTotalPrice);
        } else {
            // 기존 로직 유지 (대비책)
            const bookingType = localStorage.getItem('bookingType');
            const travelClass = localStorage.getItem('travelClass') || 'Economy';

            console.log('Booking Type:', bookingType);

            let totalPrice = 0;
            const adults = parseInt(localStorage.getItem('adults') || '1');
            const children = parseInt(localStorage.getItem('children') || '0');

            // Calculate outbound flight price
            if (flightInfo.outboundFlights && flightInfo.outboundFlights.length > 0) {
                const outboundPriceEntry = flightInfo.outboundFlights[0].prices.find(
                    p => p.class.toLowerCase() === travelClass.toLowerCase()
                );
                if (outboundPriceEntry) {
                    const adultPrice = parseFloat(outboundPriceEntry.price) * adults;
                    const childPrice = parseFloat(outboundPriceEntry.price) * 0.7 * children;
                    totalPrice += adultPrice + childPrice;
                }
            }

            // Calculate return flight price
            if (flightInfo.returnFlight) {
                const returnPriceEntry = flightInfo.returnFlight.prices.find(
                    p => p.class.toLowerCase() === travelClass.toLowerCase()
                );
                if (returnPriceEntry) {
                    const adultPrice = parseFloat(returnPriceEntry.price) * adults;
                    const childPrice = parseFloat(returnPriceEntry.price) * 0.7 * children;
                    totalPrice += adultPrice + childPrice;
                }
            }

            // 총 가격을 localStorage에 저장
            localStorage.setItem('totalTripPrice', totalPrice);
            setTotalPrice(totalPrice);
        }
    };


    const handleCustomerInfoChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,12}$/;

        if (!customerInfo.firstName.trim()) errors.firstName = 'First name is required';
        if (!customerInfo.lastName.trim()) errors.lastName = 'Last name is required';
        if (!customerInfo.email.trim()) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(customerInfo.email)) {
            errors.email = 'Invalid email format';
        }
        if (!customerInfo.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(customerInfo.phone)) {
            errors.phone = 'Invalid phone number';
        }
        if (!customerInfo.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const prepareReservationDetails = () => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const userId = storedUser.id;

            return {
                userId: userId,
                flightId: selectedFlightInfo.outboundFlights[0].id,
                returnFlightId: selectedFlightInfo.returnFlight ? selectedFlightInfo.returnFlight.id : null,
                seatId: selectedSeats.outbound,
                returnSeatId: selectedSeats.return || null,
                ...customerInfo,
                totalPrice: totalPrice
            };
        } catch (error) {
            console.error('Error preparing reservation details:', error);
            alert('Failed to prepare reservation details');
            return null;
        }
    };

    const convertSeatToId = (planeId, seatNumber) => {
        // First, find the base seat ID for this plane
        // Assuming plane IDs start from 1 and each plane has 80 seats
        const baseSeatId = (planeId - 1) * 80 + 1;

        // Convert seat letters to numeric index
        const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const letterIndex = seatLetters.indexOf(seatNumber[0]);
        const rowNumber = parseInt(seatNumber.slice(1));

        // Calculate the specific seat ID
        const seatId = baseSeatId + (letterIndex * 10) + (rowNumber - 1);

        return seatId;
    };

    const handleReservation = async (e) => {
        e.preventDefault();

        // Validate form first
        if (!validateForm()) return;

        const details = prepareReservationDetails();
        if (!details) return;

        // Check booking type
        const bookingType = localStorage.getItem('bookingType');

        // For non-member booking, require email verification
        if (bookingType === 'nonmember' && !isEmailVerified) {
            alert('Please verify your email first');
            return;
        }

        // Log the current state and localStorage for debugging
        console.log('Selected Flight Info:', selectedFlightInfo);
        console.log('Customer Info:', customerInfo);
        console.log('Selected Seats:', selectedSeats);
        console.log('Total Price:', totalPrice);
        console.log('Stored User:', localStorage.getItem('user'));
        console.log('Stored Token:', localStorage.getItem('token'));

        const checkLoginStatus = () => {
            if (bookingType === 'nonmember') {
                return true;
            }

            if (bookingType === "member") {
                // Check token existence
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('No authentication token found. Please log in again.');
                    return false;
                }

                // Check user information
                const userString = localStorage.getItem('user');
                if (!userString) {
                    alert('User information not found. Please log in again.');
                    return false;
                }

                try {
                    /* const userObject = JSON.parse(userString);
                     if (!userObject.id) {
                         alert('Invalid user information. Please log in again.');
                         return false;
                     }*/

                    const userId = parseInt(userString, 10);

                    if (isNaN(userId)) {
                        alert('Invalid user information. Please log in again.');
                        return false;
                    }

                    // Additional optional checks
                    const tokenExpiration = localStorage.getItem('tokenExpiration');
                    if (tokenExpiration) {
                        const currentTime = Date.now();
                        if (currentTime > parseInt(tokenExpiration)) {
                            alert('Login session expired. Please log in again.');
                            return false;
                        }
                    }

                    return true;
                } catch (error) {
                    console.error('Error parsing user data:', error);
                    alert('Error processing user information. Please log in again.');
                    return false;
                }
            }
            return true;
        };

        // Verify login status before proceeding
        if (!checkLoginStatus()) {
            history.push('/login');
            return;
        }

        try {
            // Rest of the existing reservation preparation logic
            //const storedUser = JSON.parse(localStorage.getItem('user'));
            //const userId = storedUser.id;


            // Convert seat numbers to seat IDs
            const outboundSeatId = convertSeatToId(
                selectedFlightInfo.outboundFlights[0].plane.id,
                selectedSeats.outbound
            );

            // For return flight, check if it exists before converting
            const returnSeatId = selectedFlightInfo.returnFlight
                ? convertSeatToId(
                    selectedFlightInfo.returnFlight.plane.id,
                    selectedSeats.return
                )
                : null;

            const userId = bookingType === 'nonmember' ? null : JSON.parse(localStorage.getItem('user')).id;

            const reservationData = {
                userId: userId,
                flightId: selectedFlightInfo.outboundFlights[0].id,
                returnFlightId: selectedFlightInfo.returnFlight ? selectedFlightInfo.returnFlight.id : null,
                seatId: outboundSeatId,
                returnSeatId: returnSeatId,
                ...customerInfo,
                totalPrice: totalPrice
            };

            // Open payment modal
            setReservationDetails(reservationData);
            setIsPaymentModalOpen(true);

        } catch (error) {
            console.error('Detailed Reservation Preparation Error:', error);
            alert(`Reservation preparation failed: ${error.message}`);
        }
    };

    const renderFlightDetails = (flight, type) => {
        if (!flight) return null;

        return (
            <div className={`flight-details ${type}`}>
                <div className="flight-route">
                    <span>{flight.departure}</span>
                    <img src={arrow} alt="Arrow" className="arrow-image" />
                    <span>{flight.destination}</span>
                </div>
                <div className="flight-info-container">
                    <div className="flight-info-column">
                        <div className="flight-times">
                            <div>
                                <strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}
                            </div>
                            <div>
                                <strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}
                            </div>
                        </div>
                    </div>
                    <div className="flight-info-column right-align">
                        <div className="flight-additional-info">
                            <div>Flight Number: {flight.flightNumber}</div>
                            <div>Aircraft: {flight.plane.model}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderSeatMap = (seats, type) => {
        const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const seatRows = 10; // 임시로 10개의 행 표시

        return (
            <div className={`seat-map ${type}`}>
                <h3>Select {type} Seat</h3>
                <div className="seat-rows">
                    {[...Array(seatRows)].map((_, rowIndex) => (
                        <div key={rowIndex} className="seat-row">
                            {seatLetters.map((letter) => {
                                const seatNumber = `${letter}${rowIndex + 1}`;
                                const isSeatAvailable = seats?.includes(seatNumber); // seats 배열이 있다면 includes 사용, 없다면 false 반환
                                const isSelected = selectedSeats[type] === seatNumber;

                                //console.log(`Seat ${seatNumber} is in column ${columnIndex}`);

                                return (
                                    <div
                                        key={seatNumber}
                                        className={`seat ${isSeatAvailable ? 'available' : 'unavailable'} ${isSelected ? 'selected' : ''
                                            }`}
                                        onClick={() => handleSeatSelection(type, seatNumber)}
                                    >
                                        {seatNumber}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const handleSeatSelection = (type, seatNumber) => {
        setSelectedSeats((prevState) => ({
            ...prevState,
            [type]: seatNumber,
        }));
    };

    const PaymentModal = ({
        isOpen,
        onClose,
        //reservationDetails,
        totalPrice
    }) => {
        const [paymentMethod, setPaymentMethod] = useState('credit');

        const paymentMethods = [
            {
                id: 'credit',
                name: 'Credit Card',
                icon: <CiCreditCard1 />
            },
            {
                id: 'paypal',
                name: 'PayPal',
                icon: <PiPaypalLogo />
            },
            {
                id: 'apple',
                name: 'Apple Pay',
                icon: <FaApplePay />
            },
            {
                id: 'bank',
                name: 'Bank Transfer',
                icon: <AiOutlineBank />
            }
        ];

        const calculateFlightPriceId = (flightId, travelClass) => {
            // Since each flight has 3 classes, and they're in order (economy, business, first)
            // We can calculate the base ID for the flight and add the offset for the class
            const baseId = (flightId - 1) * 3 + 1;

            const classOffsets = {
                'Economy': 0,
                'Business': 1,
                'First': 2
            };

            return baseId + classOffsets[travelClass];
        };

        const handleConfirmPayment = async () => {
            try {
                /*const response = await axios.post('http://localhost:4000/api/users/reservations', reservationDetails, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
                    }
                });*/

                const travelClass = localStorage.getItem('travelClass');

                // Calculate flight price IDs for both outbound and return flights
                const outboundFlightPriceId = calculateFlightPriceId(
                    selectedFlightInfo.outboundFlights[0].id,
                    travelClass
                );

                let returnFlightPriceId = null;
                if (selectedFlightInfo.returnFlight) {
                    returnFlightPriceId = calculateFlightPriceId(
                        selectedFlightInfo.returnFlight.id,
                        travelClass
                    );
                }

                // Update seat capacity for outbound flight
                await axios.patch(
                    `http://localhost:4000/api/users/flight-prices/${selectedFlightInfo.outboundFlights[0].id}/update-seat-capacity?class=${travelClass.toLowerCase()}`
                );

                // If return flight exists, update its seat capacity too
                if (returnFlightPriceId) {
                    await axios.patch(
                        `http://localhost:4000/api/users/flight-prices/${selectedFlightInfo.returnFlight.id}/update-seat-capacity?class=${travelClass.toLowerCase()}`
                    );
                }

                const bookingType = localStorage.getItem('bookingType');

                // 왕복 여부 확인 및 좌석 ID 변환 로직 추가
                const outboundFlightId = selectedFlightInfo.outboundFlights[0].id;
                const outboundSeatId = convertSeatToId(
                    selectedFlightInfo.outboundFlights[0].plane.id,
                    selectedSeats.outbound
                );

                // 돌아오는 편 처리 로직 강화
                let returnFlightId = null;
                let returnSeatId = null;

                // returnFlight가 존재하는지 명확히 확인
                if (selectedFlightInfo.returnFlight) {
                    returnFlightId = selectedFlightInfo.returnFlight.id;

                    // 돌아오는 편 좌석도 ID로 변환
                    returnSeatId = convertSeatToId(
                        selectedFlightInfo.returnFlight.plane.id,
                        selectedSeats.return
                    );
                }

                const userId = bookingType === 'member'
                    ? JSON.parse(localStorage.getItem('user')).id
                    : null;

                // 예약 데이터 준비
                const reservationData = {
                    outboundReservation: {
                        userId: userId,
                        flightId: outboundFlightId,
                        seatNumber: selectedSeats.outbound,
                        ...customerInfo,
                        totalPrice: totalPrice / 2  // 가는 편 가격
                    },
                    returnReservation: selectedFlightInfo.returnFlight ? {
                        userId: userId,
                        flightId: returnFlightId,
                        seatNumber: selectedSeats.return || null, 
                        ...customerInfo,
                        totalPrice: totalPrice / 2  // 오는 편 가격
                    } : null
                };

                const url = bookingType === 'nonmember'
                    ? 'http://localhost:4000/api/users/nonmember-reservations'
                    : 'http://localhost:4000/api/users/reservations';

                // Determine headers based on booking type
                const config = bookingType === 'member'
                    ? {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                    : {};

                const response = await axios.post(url, reservationData, config);

                console.log('Reservation Response:', response.data);

                /*const response = await axios.post('http://localhost:4000/api/users/reservations', reservationDetails, {
                    headers: headers
                });*/

                // 응답 구조에 따라 동적으로 처리
                const bookingReferenceId =
                    response.data.outboundTicket?.id ||
                    response.data.id ||
                    'N/A';

                // Prepare flight details with a single declaration
                const flightDetails = {
                    outbound: {
                        departureLocation: selectedFlightInfo.outboundFlights[0].departure,
                        departureDate: new Date(selectedFlightInfo.outboundFlights[0].departureTime).toLocaleDateString(),
                        departureTime: new Date(selectedFlightInfo.outboundFlights[0].departureTime).toLocaleTimeString(),
                        arrivalLocation: selectedFlightInfo.outboundFlights[0].destination,
                        arrivalDate: new Date(selectedFlightInfo.outboundFlights[0].arrivalTime).toLocaleDateString(),
                        arrivalTime: new Date(selectedFlightInfo.outboundFlights[0].arrivalTime).toLocaleTimeString(),
                        flightNumber: selectedFlightInfo.outboundFlights[0].flightNumber
                    },
                    return: selectedFlightInfo.returnFlight ? {
                        departureLocation: selectedFlightInfo.returnFlight.departure,
                        departureDate: new Date(selectedFlightInfo.returnFlight.departureTime).toLocaleDateString(),
                        departureTime: new Date(selectedFlightInfo.returnFlight.departureTime).toLocaleTimeString(),
                        arrivalLocation: selectedFlightInfo.returnFlight.destination,
                        arrivalDate: new Date(selectedFlightInfo.returnFlight.arrivalTime).toLocaleDateString(),
                        arrivalTime: new Date(selectedFlightInfo.returnFlight.arrivalTime).toLocaleTimeString(),
                        flightNumber: selectedFlightInfo.returnFlight.flightNumber
                    } : null
                };

                // Set booking reference and flight details
                setBookingReference(bookingReferenceId.toString());
                setSuccessFlightDetails(flightDetails);

                // Close payment modal and open success modal
                setIsPaymentModalOpen(false);
                setIsReservationSuccessModalOpen(true);
            } catch (error) {
                console.error('Reservation error:', error);
                const errorMessage = error.response?.data?.error
                    || error.message
                    || 'Please check your details and try again.';

                alert(`Reservation failed: ${errorMessage}`);
            }
        };

        if (!isOpen) return null;

        return (
            <div className="payment-modal-overlay">
                <div className="payment-modal">
                    <button className="modal-close" onClick={onClose}>✕</button>
                    <h2>Payment Details</h2>

                    <div className="payment-method-tabs">
                        {paymentMethods.map((method) => (
                            <div
                                key={method.id}
                                className={`payment-tab ${paymentMethod === method.id ? 'active' : ''}`}
                                onClick={() => setPaymentMethod(method.id)}
                            >
                                <span className="payment-icon">{method.icon}</span>
                                <span className="payment-name">{method.name}</span>
                            </div>
                        ))}
                    </div>

                    <div className="payment-details">
                        <div className="total-amount">
                            <strong>Total Amount:</strong>
                            <span>USD {(totalPrice * (1 + 0.22 + 0.12)).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button
                            className="confirm-payment-btn"
                            onClick={handleConfirmPayment}
                        >
                            Confirm Payment
                        </button>
                    </div>
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

    const sendVerificationEmail = () => {
        // Validate email first
        if (!validateEmail(customerInfo.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Generate 6-digit verification code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setSentVerificationCode(code);

        // Prepare email template parameters
        const templateParams = {
            customer_name: customerInfo.firstName,
            customer_email: customerInfo.email,
            verification_code: code
        };

        // Send email using EmailJS
        emailjs.send(
            'service_vdrbdwt',
            'template_wnabwqf',
            templateParams,
            'ttxjKC7vfQ51GYuFi'
        )
            .then(() => {
                // Open verification modal
                setIsEmailVerificationModalOpen(true);
            })
            .catch((error) => {
                console.error('Email send error:', error);
                alert('Failed to send verification email');
            });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const verifyEmailCode = () => {
        if (verificationCode === sentVerificationCode) {
            setIsEmailVerified(true);
            setIsEmailVerificationModalOpen(false);
        } else {
            alert('Incorrect verification code. Please try again.');
        }
    };

    return (
        <div className="reservation-container">
            <div className="reservation-content">
                <div className="selected-flights">
                    <h2>Selected Flights</h2>
                    {selectedFlightInfo && (
                        <>
                            {renderFlightDetails(selectedFlightInfo.outboundFlights[0], 'outbound')}
                            {selectedFlightInfo.returnFlight &&
                                renderFlightDetails(selectedFlightInfo.returnFlight, 'return')}
                        </>
                    )}
                </div>

                <form onSubmit={handleReservation} className="customer-info-form">
                    <h2>Passenger Information</h2>
                    <div className="name-row">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                id="firstName"
                                type="text"
                                name="firstName"
                                placeholder="Enter your first name"
                                value={customerInfo.firstName}
                                onChange={handleCustomerInfoChange}
                                required
                            />
                            {formErrors.firstName && <span className="error">{formErrors.firstName}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                id="lastName"
                                type="text"
                                name="lastName"
                                placeholder="Enter your last name"
                                value={customerInfo.lastName}
                                onChange={handleCustomerInfoChange}
                                required
                            />
                            {formErrors.lastName && <span className="error">{formErrors.lastName}</span>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="passportNumber">Passport Number</label>
                        <input
                            id="passportNumber"
                            type="text"
                            name="passportNumber"
                            placeholder="Enter your passport number"
                            value={customerInfo.passportNumber}
                            onChange={handleCustomerInfoChange}
                            required
                        />
                        {formErrors.passportNumber && <span className="error">{formErrors.passportNumber}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={customerInfo.email}
                            onChange={handleCustomerInfoChange}
                            required
                        />
                        {formErrors.email && <span className="error">{formErrors.email}</span>}
                    </div>
                    {localStorage.getItem('bookingType') === 'nonmember' && (
                        <button
                            type="button"
                            className="email-verification-btn"
                            onClick={sendVerificationEmail}
                            disabled={isEmailVerified}
                        >
                            {isEmailVerified ? 'Verified ✓' : 'Verify Email'}
                        </button>
                    )}

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={customerInfo.phone}
                            onChange={handleCustomerInfoChange}
                            required
                        />
                        {formErrors.phone && <span className="error">{formErrors.phone}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                        <input
                            id="dateOfBirth"
                            type="date"
                            name="dateOfBirth"
                            value={customerInfo.dateOfBirth}
                            onChange={handleCustomerInfoChange}
                            required
                        />
                        {formErrors.dateOfBirth && <span className="error">{formErrors.dateOfBirth}</span>}
                    </div>

                    <div className="seat-selection">
                        {selectedFlightInfo && (
                            <>
                                {renderSeatMap(
                                    selectedFlightInfo.outboundFlights[0].availableSeats,
                                    'outbound'
                                )}
                                {selectedFlightInfo.returnFlight &&
                                    renderSeatMap(
                                        selectedFlightInfo.returnFlight.availableSeats,
                                        'return'
                                    )}
                            </>
                        )}
                    </div>
                </form>
                <EmailVerificationModal
                    isOpen={isEmailVerificationModalOpen}
                    onClose={() => setIsEmailVerificationModalOpen(false)}
                    onVerify={verifyEmailCode}
                    verificationCode={verificationCode}
                    onChangeCode={(e) => setVerificationCode(e.target.value)}
                />

                <button
                    type="button"
                    className="submit-btn"
                    onClick={handleReservation}
                >
                    Pay Now
                </button>

                <PaymentModal
                    isOpen={isPaymentModalOpen}
                    onClose={() => setIsPaymentModalOpen(false)}
                    reservationDetails={reservationDetails}
                    totalPrice={totalPrice}
                />
            </div>

            <div className="reservation-sidebar">
                <div className="pricing-details">
                    <h3>Air transporations charges</h3>
                    <div className="price-item">
                        <span className="label">Fare</span>
                        <span className="price">USD {totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="price-item">
                        <span className="label">Carrier Imposed Fee</span>
                        <span className="price">USD {(totalPrice * 0.22).toFixed(2)}</span>
                    </div>
                    <div className="price-item">
                        <span className="label">Taxes, Fees, and Charges</span>
                        <span className="price">USD {(totalPrice * 0.12).toFixed(2)}</span>
                    </div>
                    <div className="total-price">
                        <strong>Total Amount</strong>
                        <strong>USD {(totalPrice * (1 + 0.22 + 0.12)).toFixed(2)}</strong>
                    </div>
                    <div className="price-disclaimer">
                        <p
                            onClick={() => setIsCancellationModalOpen(true)}
                            className="cursor-pointer hover:underline"
                        >
                            Changes and Refund Regulations Apply
                        </p>
                    </div>
                </div>
            </div>
            <CancellationModal
                isOpen={isCancellationModalOpen}
                onClose={() => setIsCancellationModalOpen(false)}
            />
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                reservationDetails={reservationDetails}
                totalPrice={totalPrice}
            />

            <ReservationSuccessModal
                isOpen={isReservationSuccessModalOpen}
                onClose={() => setIsReservationSuccessModalOpen(false)}
                bookingReference={bookingReference}
                flightDetails={successFlightDetails}
            />

        </div>
    );
};

export default Reservation; 