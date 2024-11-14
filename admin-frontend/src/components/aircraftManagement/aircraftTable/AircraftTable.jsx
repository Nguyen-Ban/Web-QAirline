import { Link } from "react-router-dom";
import "./aircraftTable.css";

const AircraftTable = () => {
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
          <tr>
            <td>1</td>
            <td>QAL007</td>
            <td>Airbus A380-800</td>
            <td>Airbus</td>
            <td>3</td>
            <td>76</td>
            <td>429</td>
            <td>
              <Link to="/add-aircraft">
                <div>Edit</div>
              </Link>
              <Link to="/add-aircraft">
                <div>Schedule</div>
              </Link>
              <Link>
                <div>Remove</div>
              </Link>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>QAL024</td>
            <td>Airbus A380-800</td>
            <td>Airbus</td>
            <td>3</td>
            <td>76</td>
            <td>429</td>
          </tr>
          <tr>
            <td>3</td>
            <td>QAL007</td>
            <td>Boeing 747-8</td>
            <td>Boeing</td>
            <td>6</td>
            <td>80</td>
            <td>244</td>
          </tr>

          <tr>
            <td>4</td>
            <td>QAL007</td>
            <td>Boeing 777-300ER</td>
            <td>Boeing</td>
            <td>8</td>
            <td>42</td>
            <td>304</td>
          </tr>
          <tr>
            <td>5</td>
            <td>QAL007</td>
            <td>Embraer E195-E2 </td>
            <td>Embraer</td>
            <td>0</td>
            <td>12</td>
            <td>124</td>
          </tr>
          <tr>
            <td>6</td>
            <td>QAL007</td>
            <td>Airbus A321</td>
            <td>Airbus</td>
            <td>0</td>
            <td>16</td>
            <td>180</td>
          </tr>
          <tr>
            <td>7</td>
            <td>QAL007</td>
            <td>Boeing 787-9</td>
            <td>Boeing</td>
            <td>4</td>
            <td>32</td>
            <td>220</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AircraftTable;
