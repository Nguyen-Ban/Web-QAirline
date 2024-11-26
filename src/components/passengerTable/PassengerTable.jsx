import { useEffect, useState } from "react";
import "./passengerTable.css";
import { fetchPassengersAPI } from "../../services/api.service";

const PassengerTable = () => {
  const [passengerData, setPassengerData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const res = await fetchPassengersAPI();
    setPassengerData(res);
  };
  return (
    <div className="passenger-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Day of Birth</th>
            <th>Gender</th>
            <th>Flight</th>
            <th>Contact</th>
          </tr>
        </thead>

        <tbody>
          {passengerData.map((item, index) => {
            return (
              <tr className="passenger-item">
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.dob}</td>
                <td>{item.gender}</td>
                <td>{item.flight}</td>
                <td>{item.contact}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PassengerTable;
