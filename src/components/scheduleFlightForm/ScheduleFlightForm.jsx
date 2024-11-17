import "./scheduleFlightForm.css";

const ScheduleFlightForm = () => {
  return (
    <div className="schedule-flight-form">
      <form action="">
        <div>
          <label htmlFor="flight-code">Enter Flight Code</label>
          <input type="text" name="flight-code" id="flight-code" />
        </div>
        <div>
          <label htmlFor="aircraft-code">Select Aircraft Code</label>
          <select name="aircraft-code" id="aircraft-code">
            <option value="QAL006">QAL006</option>
            <option value="QAL137">QAL137</option>
            <option value="QAL225">QAL137</option>
          </select>
        </div>
        <div>
          <label htmlFor="source">Select Source</label>
          <select name="source" id="source">
            <option value="hanoi">Hanoi</option>
            <option value="hcmCity">Ho Chi Minh City</option>
            <option value="mumbai">Mumbai</option>
          </select>
        </div>
        <div>
          <label htmlFor="destination">Select Destination</label>
          <select name="destination" id="destination">
            <option value="phuQuoc">Phu Quoc</option>
            <option value="daNang">Da Nang</option>
            <option value="london">London</option>
          </select>
        </div>
        <div>
          <label htmlFor="departure-time">Select Departure Time</label>
          <input type="date" name="departure-time" id="departure-time" />
        </div>
        <div>
          <label htmlFor="arrival-time">Select Arrival Time</label>
          <input type="date" name="arrival-time" id="arrival-time" />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default ScheduleFlightForm;
