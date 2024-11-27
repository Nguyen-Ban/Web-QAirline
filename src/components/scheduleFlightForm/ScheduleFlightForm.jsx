import { useState } from "react";
import "./scheduleFlightForm.css";
import { createFlightAPI } from "../../services/api.service";

const ScheduleFlightForm = () => {
  const [flightCode, setFlightCode] = useState("");
  const [airplaneCode, setAirplaneCode] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");

  const [notification, setNotification] = useState("");
  const handleSubmitFlight = async () => {
    const res = await createFlightAPI({
      flightCode,
      airplaneCode,
      source,
      destination,
      departureTime,
      arrivalTime,
    });
    setNotification("Schedule Flight Successfully");
  };
  return (
    <div className="schedule-flight-form">
      <form>
        <div>
          <label htmlFor="flight-code">Enter Flight Code</label>
          <input
            type="text"
            name="flight-code"
            id="flight-code"
            value={flightCode}
            onChange={(e) => setFlightCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="airplane-code">Select Airplane Code</label>
          <select
            name="airplane-code"
            id="airplane-code"
            value={airplaneCode}
            onChange={(e) => setAirplaneCode(e.target.value)}
          >
            <option value=""></option>
            <option value="QAL006">QAL006</option>
            <option value="QAL137">QAL137</option>
            <option value="QAL225">QAL137</option>
          </select>
        </div>
        <div>
          <label htmlFor="source">Select Source</label>
          <select
            name="source"
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option value=""></option>
            <option value="hanoi">Hanoi</option>
            <option value="hcmCity">Ho Chi Minh City</option>
            <option value="mumbai">Mumbai</option>
          </select>
        </div>
        <div>
          <label htmlFor="destination">Select Destination</label>
          <select
            name="destination"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            <option value=""></option>
            <option value="phuQuoc">Phu Quoc</option>
            <option value="daNang">Da Nang</option>
            <option value="london">London</option>
          </select>
        </div>
        <div>
          <label htmlFor="departure-time">Select Departure Time</label>
          <input
            type="date"
            name="departure-time"
            id="departure-time"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="arrival-time">Select Arrival Time</label>
          <input
            type="date"
            name="arrival-time"
            id="arrival-time"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
          />
        </div>
        <div className="submit" onClick={handleSubmitFlight}>
          Submit
        </div>
      </form>
      <div className="notification">{notification}</div>
    </div>
  );
};

export default ScheduleFlightForm;
