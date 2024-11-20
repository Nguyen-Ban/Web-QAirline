import { Link } from "react-router-dom";
import "./aircraftTable.css";
import { useEffect, useState } from "react";
import { fetchPlanesAPI } from "../../../services/api.service";

const AircraftTable = () => {
  const [aircraftData, setAircraftData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetchPlanesAPI();
    setAircraftData(res.data);
  };
  return (
    <div className="aircraft-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Aircraft Code</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>First Class</th>
            <th>Business Class</th>
            <th>Economy Class</th>
            <th className="action">Action</th>
          </tr>
        </thead>

        <tbody>
          {aircraftData.map((item, index) => {
            return (
              <tr className="aircraft-item">
                <td>{index + 1}</td>
                <td>{item.aircraftCode}</td>
                <td>{item.model}</td>
                <td>{item.manufacturer}</td>
                <td>{item.firstClass}</td>
                <td>{item.businessClass}</td>
                <td>{item.economyClass}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AircraftTable;
