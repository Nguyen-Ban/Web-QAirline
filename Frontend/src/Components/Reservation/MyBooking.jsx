import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
//import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';

const MyBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cancelSuccessMessage, setCancelSuccessMessage] = useState(null);
    const [cancelConfirmation, setCancelConfirmation] = useState(null);
    const bookingRefs = useRef({});

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

    // 날짜 변환 유틸리티 함수 추가
    const parseDateSafely = (dateString) => {
        // 다양한 날짜 형식 처리
        if (!dateString) return null;

        // 이미 Date 객체인 경우
        if (dateString instanceof Date) return dateString;

        // 시간만 있는 문자열 무시
        if (/^\d{1,2}:\d{2}\s?[APM]{2}$/.test(dateString)) {
            console.error('Invalid date format:', dateString);
            return null;
        }

        // ISO 형식이나 기타 형식의 날짜 파싱
        try {
            const parsedDate = new Date(dateString);

            // 유효한 날짜인지 확인
            if (isNaN(parsedDate.getTime())) {
                console.error('Cannot parse date:', dateString);
                return null;
            }

            return parsedDate;
        } catch (error) {
            console.error('Date parsing error:', error);
            return null;
        }
    };

    const calculateCancellationPolicy = (booking) => {
        // 날짜 정보 추출 로직 개선
        let departureTime = null;

        // 여러 가능한 날짜 필드 확인
        const dateFields = [
            booking.departureTime,
            booking.departureDate,
            booking.flightDepartureTime
        ];

        for (let dateField of dateFields) {
            departureTime = parseDateSafely(dateField);
            if (departureTime) break;
        }

        // 날짜를 찾지 못한 경우
        if (!departureTime) {
            console.error('No valid departure time found:', booking);
            return {
                cancellable: false,
                message: 'Invalid Flight Date',
                refundPercentage: 0
            };
        }

        // 현재 날짜와 비교
        const currentDate = new Date();
        const timeDifference = departureTime.getTime() - currentDate.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24);

        console.log('Departure Time:', departureTime);
        console.log('Current Time:', currentDate);
        console.log('Days Difference:', daysDifference);

        // 기존의 취소 정책 로직 유지
        if (daysDifference < 0) {
            return {
                cancellable: false,
                message: "This flight has already departed. Unfortunately, cancellations or changes are not possible.",
                refundPercentage: 0
            };
        }
        
        if (daysDifference > 7) {
            return {
                cancellable: true,
                message: "You can cancel your flight for a full refund and free cancellation since the departure is more than 7 days away.",
                refundPercentage: 100
            };
        }
        
        if (daysDifference >= 5 && daysDifference <= 7) {
            return {
                cancellable: true,
                message: "You are eligible for free changes to your booking, as the departure is between 5 and 7 days away. Unfortunately, no refunds are available.",
                refundPercentage: 0
            };
        }
        
        if (daysDifference >= 3 && daysDifference < 5) {
            return {
                cancellable: true,
                message: "A 50% refund is available since your departure is between 3 and 5 days away. Feel free to proceed with cancellation.",
                refundPercentage: 50
            };
        }
        
        if (daysDifference >= 2 && daysDifference < 3) {
            return {
                cancellable: true,
                message: "A 25% refund is available since your departure is between 2 and 3 days away. You can proceed with cancellation if needed.",
                refundPercentage: 25
            };
        }
        
        if (daysDifference < 1) {
            return {
                cancellable: false,
                message: "Unfortunately, cancellations or changes are not allowed less than 24 hours before departure.",
                refundPercentage: 0
            };
        }        

        // 기본값 반환
        return {
            cancellable: false,
            message: 'Cancellation Not Possible',
            refundPercentage: 0
        };
    };

    const handleCancelTicket = async (booking) => {
        // 취소 정책 계산
        const cancellationPolicy = calculateCancellationPolicy(booking);

        console.log('Cancellation Policy:', cancellationPolicy);

        if (!cancellationPolicy.cancellable) {
            setCancelConfirmation({
                bookingId: booking.id,
                message: cancellationPolicy.message,
                type: 'error'
            });
            return;
        }

        // 취소 로직
        if (cancellationPolicy.refundPercentage > 0) {
            setCancelConfirmation({
                bookingId: booking.id,
                message: `${cancellationPolicy.message} (${cancellationPolicy.refundPercentage}% Refund)`,
                refundPercentage: cancellationPolicy.refundPercentage,
                onConfirm: async () => {
                    try {
                        await axios.delete(`http://localhost:4000/api/users/reservations/${booking.id}`, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            }
                        });

                        setBookings(prevBookings =>
                            prevBookings.filter(b => b.id !== booking.id)
                        );

                        setCancelSuccessMessage(`✅ Booking ${booking.id} has been successfully cancelled.`);
                        setCancelConfirmation(null);

                        setTimeout(() => {
                            setCancelSuccessMessage(null);
                        }, 3000);
                    } catch (err) {
                        console.error('Error cancelling ticket:', err);
                    }
                }
            });
        } else {
            // 무료 변경 또는 전액 환불 시나리오
            try {
                await axios.delete(`http://localhost:4000/api/users/reservations/${booking.id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                setBookings(prevBookings =>
                    prevBookings.filter(b => b.id !== booking.id)
                );

                setCancelSuccessMessage(`✅ Booking ${booking.id} has been successfully cancelled.`);

                setTimeout(() => {
                    setCancelSuccessMessage(null);
                }, 3000);
            } catch (err) {
                console.error('Error cancelling ticket:', err);
            }
        }
    };

    const handlePrintTicket = async (bookingId) => {
        const bookingElement = bookingRefs.current[bookingId];

        if (!bookingElement) return;

        try {
            // Capture the booking element and its child elements
            const imgData = await domtoimage.toPng(bookingElement, {
                height: bookingElement.scrollHeight,
                width: bookingElement.scrollWidth,
                quality: 1,
                style: {
                    transform: 'scale(1)',  // Scale to 1 to match the screen appearance
                    transformOrigin: 'top left'
                },
                scale: 2  // Increase scale for higher resolution without altering the appearance
            });

            const doc = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4'
            });

            const imgWidth = 190;  // Width adjustment for A4 size
            const imgHeight = imgWidth * bookingElement.scrollHeight / bookingElement.scrollWidth;

            doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            doc.save(`booking_${bookingId}.pdf`);
        } catch (err) {
            console.error('Error generating PDF:', err);
            alert('Failed to generate PDF. Please try again.');
        }
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
                        <div
                            key={booking.id}
                            className="booking-ticket"
                            ref={el => bookingRefs.current[booking.id] = el}
                        >
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
                                <div className="ticket-actions">
                                    <button
                                        className="btn-print"
                                        onClick={() => handlePrintTicket(booking.id)}
                                    >
                                        Print Ticket
                                    </button>
                                    <button
                                        className="btn-cancel"
                                        onClick={() => handleCancelTicket(booking)}
                                    >
                                        Cancel Booking
                                    </button>
                                </div>
                            </div>
                        </div>

                    ))}
                    {cancelConfirmation && (
                        <div className="cancellation-confirmation">
                            <div className={`confirmation-modal ${cancelConfirmation.type}`}>
                                <h3>Cancellation Policy</h3>
                                <p>{cancelConfirmation.message}</p>
                                {cancelConfirmation.refundPercentage !== undefined && (
                                    <>
                                        <div className="confirmation-actions">
                                            <button
                                                className="btn-confirm"
                                                onClick={cancelConfirmation.onConfirm}
                                            >
                                                Confirm Cancellation
                                            </button>
                                            <button
                                                className="btn-cancel"
                                                onClick={() => setCancelConfirmation(null)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </>
                                )}
                                {cancelConfirmation.type === 'error' && (
                                    <button
                                        className="btn-close"
                                        onClick={() => setCancelConfirmation(null)}
                                    >
                                        Close
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                    {cancelSuccessMessage && (
                        <div className="cancellation-toast">
                            {cancelSuccessMessage}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyBooking;