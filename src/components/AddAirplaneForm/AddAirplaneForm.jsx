import "./addAirplaneForm.css";

const AddAirplaneForm = () => {
  return (
    <div className="add-airplane-form">
      <form action="">
        <div>
          <label htmlFor="airplane-code">Enter Airplane Code</label>
          <input type="text" name="airplane-code" id="airplane-code" />
        </div>
        <div>
          <label htmlFor="select-manufacturer">Select Manufacturer</label>
          <select name="select-manufacturer" id="select-manufacturer">
            <option value="boeing">Boeing</option>
            <option value="airbus">Airbus</option>
          </select>
        </div>
        <div>
          <label htmlFor="select-model">Select Model</label>
          <select name="select-model" id="select-model">
            <option value="boeing737-800">Boeing 737-800</option>
            <option value="boeing-737-max-8">Boeing 737 MAX 8</option>
          </select>
        </div>
        <div>
          <label htmlFor="seat-config">Seat Configuration</label>
          <br />
          <div className="seat-config-options">
            <div>
              <label htmlFor="economy">Economy</label>
              <input type="number" name="economy" id="economy" />
            </div>
            <div>
              <label htmlFor="business">Business</label>
              <input type="number" name="business" id="business" />
            </div>
            <div>
              <label htmlFor="first">First</label>
              <input type="number" name="first" id="first" />
            </div>
          </div>
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AddAirplaneForm;
