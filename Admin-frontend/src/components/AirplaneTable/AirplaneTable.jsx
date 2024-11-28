import "./airplaneTable.css";
import { useEffect, useState } from "react";
import { fetchAirplanesAPI } from "../../services/api.service";

const AirplaneTable = () => {
  const [airplaneData, setAirplaneData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetchAirplanesAPI();
    setAirplaneData(res);
  };
  return (
    <div className="airplane-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Airplane Code</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>First</th>
            <th>Business</th>
            <th>Economy</th>
            <th className="action">Action</th>
          </tr>
        </thead>

        <tbody>
          {airplaneData.map((item, index) => {
            return (
              <tr className="airplane-item">
                <td>{index + 1}</td>
                <td>{item.airplaneCode}</td>
                <td>{item.model}</td>
                <td>{item.manufacturer}</td>
                <td>{item.first}</td>
                <td>{item.business}</td>
                <td>{item.economy}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AirplaneTable;
