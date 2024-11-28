import { useState } from "react";
import "./addAirplaneForm.css";
import { createAirplaneAPI } from "../../services/api.service";

const AddAirplaneForm = () => {
  const [airplaneCode, setAirplaneCode] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  const [economy, setEconomy] = useState(0);
  const [business, setBusiness] = useState(0);
  const [first, setFirst] = useState(0);

  const [notification, setNotification] = useState("");

  const handleSubmitAirplane = async () => {
    const res = await createAirplaneAPI({
      airplaneCode,
      manufacturer,
      model,

      first,
      business,
      economy,
    });
    if (res) setNotification("Post Created Successfully");
  };

  return (
    <div className="add-airplane-form">
      <form action="">
        <div>
          <label htmlFor="airplane-code">Enter Airplane Code</label>
          <input
            type="text"
            name="airplane-code"
            id="airplane-code"
            value={airplaneCode}
            onChange={(e) => setAirplaneCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="select-manufacturer">Select Manufacturer</label>
          <select
            name="select-manufacturer"
            id="select-manufacturer"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
          >
            <option value=""></option>
            <option value="Boeing">Boeing</option>
            <option value="Airbus">Airbus</option>
          </select>
        </div>
        <div>
          <label htmlFor="select-model">Select Model</label>
          <select
            name="select-model"
            id="select-model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value=""></option>
            <option value="Boeing 737-800">Boeing 737-800</option>
            <option value="Boeing 737 MAX 8">Boeing 737 MAX 8</option>
          </select>
        </div>
        <div>
          <label htmlFor="seat-config">Seat Configuration</label>
          <div className="seat-config-options">
            <div>
              <label htmlFor="first">First</label>
              <input
                type="number"
                name="first"
                id="first"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="business">Business</label>
              <input
                type="number"
                name="business"
                id="business"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="economy">Economy</label>
              <input
                type="number"
                name="economy"
                id="economy"
                value={economy}
                onChange={(e) => setEconomy(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="submit" onClick={handleSubmitAirplane}>
          Submit
        </div>
      </form>
      <div className="notification">{notification}</div>
    </div>
  );
};

export default AddAirplaneForm;
