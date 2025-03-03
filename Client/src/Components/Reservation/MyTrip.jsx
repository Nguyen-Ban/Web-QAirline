import { useState, useRef } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import domtoimage from "dom-to-image";

const MyTrip = () => {
  const [reservationDetails, setReservationDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    reservationId: "",
    firstName: "",
    lastName: "",
    departure: "",
    destination: "",
    travelDate: "",
  });
  const [cancelSuccessMessage, setCancelSuccessMessage] = useState(null);
  const [cancelConfirmation, setCancelConfirmation] = useState(null);
  const bookingRefs = useRef({});

  // Helper function to convert seat ID back to seat number (same as MyBooking)
  const convertSeatIdToSeat = (planeId, seatId) => {
    const seatLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const baseSeatId = (planeId - 1) * 80 + 1;

    const relativeSeatId = seatId - baseSeatId;
    const letterIndex = Math.floor(relativeSeatId / 10);
    const rowNumber = (relativeSeatId % 10) + 1;

    return `${seatLetters[letterIndex]}${rowNumber}`;
  };

  // Format date and time (same as MyBooking)
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      boardTime: new Date(date.getTime() - 30 * 60000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const calculateCancellationPolicy = (departureTimeStr) => {
    const departureTime = new Date(departureTimeStr);
    const currentDate = new Date();
    const timeDifference = departureTime.getTime() - currentDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if (daysDifference < 0) {
      return {
        cancellable: false,
        message:
          "This flight has already departed. Unfortunately, cancellations or changes are not possible.",
        refundPercentage: 0,
      };
    }

    if (daysDifference > 7) {
      return {
        cancellable: true,
        message:
          "You can cancel your flight for a full refund and free cancellation since the departure is more than 7 days away.",
        refundPercentage: 100,
      };
    }

    if (daysDifference >= 5 && daysDifference <= 7) {
      return {
        cancellable: true,
        message:
          "You are eligible for free changes to your booking, as the departure is between 5 and 7 days away. Unfortunately, no refunds are available.",
        refundPercentage: 0,
      };
    }

    if (daysDifference >= 3 && daysDifference < 5) {
      return {
        cancellable: true,
        message:
          "A 50% refund is available since your departure is between 3 and 5 days away.",
        refundPercentage: 50,
      };
    }

    if (daysDifference >= 2 && daysDifference < 3) {
      return {
        cancellable: true,
        message:
          "A 25% refund is available since your departure is between 2 and 3 days away.",
        refundPercentage: 25,
      };
    }

    return {
      cancellable: false,
      message:
        "Unfortunately, cancellations or changes are not allowed less than 24 hours before departure.",
      refundPercentage: 0,
    };
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle ticket search
  const handleSearchTicket = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setReservationDetails(null);

    try {
      const response = await axios.get(
        `http://localhost:4000/api/users/nonmember-reservations`
      );

      // Find reservation by ID
      const matchedReservation = response.data.find(
        (reservation) =>
          reservation.id === parseInt(formData.reservationId) &&
          reservation.status === "confirmed"
      );

      if (!matchedReservation) {
        throw new Error("Reservation not found");
      }

      // Fetch flight details
      const flightResponse = await axios.get(
        "http://localhost:4000/api/users/flights"
      );
      const flight = flightResponse.data.find(
        (f) => f.id === matchedReservation.flightId
      );

      if (!flight) {
        throw new Error("Flight details not found");
      }

      // Prepare booking details
      const seatDetails =
        flight.plane && flight.plane.id
          ? matchedReservation.seatNumber //convertSeatIdToSeat(flight.plane.id, matchedReservation.seatId)
          : "N/A";

      const { boardTime } = formatDateTime(flight.departureTime);

      const departure = formatDateTime(flight.departureTime);
      const arrival = formatDateTime(flight.arrivalTime);

      const bookingDetails = {
        ...matchedReservation,
        flightNumber: flight.flightNumber,
        departure: flight.departure,
        destination: flight.destination,
        planeModel: flight.plane ? flight.plane.model : "N/A",
        departureDate: departure.date,
        departureTime: departure.time,
        arrivalDate: arrival.date,
        arrivalTime: arrival.time,
        boardTime: boardTime,
        seatNumber: seatDetails,
        departureTimeISO: flight.departureTime,
      };

      setReservationDetails(bookingDetails);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Handle ticket cancellation
  const handleCancelTicket = async (bookingId) => {
    // 취소 정책 계산
    const cancellationPolicy = calculateCancellationPolicy(
      reservationDetails.departureTimeISO
    );

    if (!cancellationPolicy.cancellable) {
      setCancelConfirmation({
        bookingId: bookingId,
        message: cancellationPolicy.message,
        type: "error",
      });
      return;
    }

    setCancelConfirmation({
      bookingId: bookingId,
      message: `${cancellationPolicy.message} Do you want to proceed with the cancellation?`,
      refundPercentage: cancellationPolicy.refundPercentage,
      onConfirm: async () => {
        try {
          const response = await axios.patch(
            `http://localhost:4000/api/users/nonmember-reservations/${bookingId}`,
            { status: "cancelled" }
          );

          if (response.data.status === "cancelled") {
            setReservationDetails(null);
            setCancelSuccessMessage(
              `✅ Booking ${bookingId} has been successfully cancelled.`
            );
            setCancelConfirmation(null);

            setTimeout(() => {
              setCancelSuccessMessage(null);
            }, 3000);
          }
        } catch (err) {
          console.error("Error cancelling ticket:", err);
          alert("Failed to cancel ticket. Please try again.");
        }
      },
    });
  };

  // Handle ticket printing
  const handlePrintTicket = async (bookingId) => {
    const bookingElement = bookingRefs.current[bookingId];

    if (!bookingElement) return;

    try {
      const imgData = await domtoimage.toPng(bookingElement, {
        height: bookingElement.scrollHeight,
        width: bookingElement.scrollWidth,
        quality: 1,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
        },
        scale: 2,
      });

      const doc = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 190;
      const imgHeight =
        (imgWidth * bookingElement.scrollHeight) / bookingElement.scrollWidth;

      doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      doc.save(`booking_${bookingId}.pdf`);
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="my-trip-container">
      <div className="trip-search-form">
        <h1>My Trip</h1>
        <form onSubmit={handleSearchTicket}>
          <div className="form-group">
            <label>Reservation ID</label>
            <input
              type="text"
              name="reservationId"
              value={formData.reservationId}
              onChange={handleInputChange}
              placeholder="Enter Reservation ID"
              required
              className="reservation_id_input"
            />
          </div>
          {/* Form fields for non-essential validation */}
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Departure</label>
              <input
                type="text"
                name="departure"
                value={formData.departure}
                onChange={handleInputChange}
                placeholder="Departure City"
              />
            </div>
            <div className="form-group">
              <label>Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                placeholder="Destination City"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Travel Date</label>
            <input
              type="date"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn-search">
            Search Booking
          </button>
        </form>
      </div>

      {loading && (
        <div className="my-trip-loading">Loading booking details...</div>
      )}

      {error && <div className="my-trip-error">Error: {error}</div>}

      {reservationDetails && (
        <div className="booking-grid">
          <div
            key={reservationDetails.id}
            className="booking-ticket"
            ref={(el) => (bookingRefs.current[reservationDetails.id] = el)}
          >
            <div className="ticket-header">
              <div className="flight-number">
                {reservationDetails.flightNumber}
              </div>
              <div className="ticket-status">{reservationDetails.status}</div>
            </div>
            <div className="ticket-details">
              <div className="route">
                <div className="departure">
                  <span className="label">From</span>
                  <span className="city">{reservationDetails.departure}</span>
                </div>
                <div className="arrow">→</div>
                <div className="arrival">
                  <span className="label">To</span>
                  <span className="city">{reservationDetails.destination}</span>
                </div>
              </div>
              <div className="flight-info">
                <div className="time-details">
                  <div className="departure-time">
                    <span className="label">Departure: </span>
                    <span className="datetime">
                      {reservationDetails.departureDate}{" "}
                      {reservationDetails.departureTime}
                    </span>
                  </div>
                  <div className="board-time">
                    <span className="label">Board Time: </span>
                    <span className="time">{reservationDetails.boardTime}</span>
                  </div>
                  <div className="seat-info">
                    <span className="label">Seat: </span>
                    <span className="number">
                      {reservationDetails.seatNumber}
                    </span>
                  </div>
                </div>
                <div className="additional-details">
                  <div className="arrival-time">
                    <span className="label">Arrival: </span>
                    <span className="datetime">
                      {reservationDetails.arrivalDate}{" "}
                      {reservationDetails.arrivalTime}
                    </span>
                  </div>
                  <div className="plane-model">
                    {reservationDetails.planeModel}
                  </div>
                </div>
              </div>
            </div>
            <div className="ticket-footer">
              <div className="reservation-id">
                Reservation ID: {reservationDetails.id}
              </div>
              <div className="ticket-actions">
                <button
                  className="btn-print"
                  onClick={() => handlePrintTicket(reservationDetails.id)}
                >
                  Print Ticket
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => handleCancelTicket(reservationDetails.id)}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {cancelConfirmation && (
        <div className="cancellation-confirmation">
          <div className={`cancellation-modal ${cancelConfirmation.type}`}>
            <h3>Cancellation Policy</h3>
            <p>{cancelConfirmation.message}</p>
            {cancelConfirmation.refundPercentage !== undefined && (
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
            )}
            {cancelConfirmation.type === "error" && (
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
        <div className="cancellation-toast">{cancelSuccessMessage}</div>
      )}
    </div>
  );
};

export default MyTrip;
