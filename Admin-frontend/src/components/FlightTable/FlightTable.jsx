import { Link } from "react-router-dom";
import "./flightTable.css";
import { fetchFlightsAPI } from "../../services/api.service";
import { useEffect, useState } from "react";

const FlightTable = () => {
  const [flightData, setFlightData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetchFlightsAPI();
    setFlightData(res);
  };
  return (
    <div className="flight-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Flight Code</th>
            <th>Airplane Code</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Flight Status</th>
            <th className="action">Action</th>
          </tr>
        </thead>
        <tbody>
          {flightData.map((item, index) => {
            return (
              <tr className="flight-item">
                <td>{index + 1}</td>
                <td>{item.flightCode}</td>
                <td>{item.airplaneCode}</td>
                <td>{item.source}</td>
                <td>{item.destination}</td>
                <td>{item.departureTime}</td>
                <td>{item.arrivalTime}</td>
                <td>{item.flightStatus}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FlightTable;
