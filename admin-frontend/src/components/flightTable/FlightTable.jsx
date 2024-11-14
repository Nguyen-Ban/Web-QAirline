import { Link } from "react-router-dom";
import "./flightTable.css";

const FlightTable = () => {
  return (
    <div className="flight-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Flight Code</th>
            <th>Aircraft Code</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Flight Status</th>
            <th className="action">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>VN972</td>
            <td>QAL003</td>
            <td>Mumbai</td>
            <td>Hanoi</td>
            <td>2024-05-05 23:46:00</td>
            <td>2024-05-06 01:45:00</td>
            <td>Scheduled</td>
            <td>
              <Link to="/schedule-flight">
                <div>Edit</div>
              </Link>
              <div>Remove</div>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>VN972</td>
            <td>QAL003</td>
            <td>Mumbai</td>
            <td>Hanoi</td>
            <td>2024-05-05 23:46:00</td>
            <td>2024-05-06 01:45:00</td>
            <td>Arrived</td>
            <td>
              <div>Edit</div>
              <div>Remove</div>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>VN972</td>
            <td>QAL003</td>
            <td>Mumbai</td>
            <td>Hanoi</td>
            <td>2024-05-05 23:46:00</td>
            <td>2024-05-06 01:45:00</td>
            <td>In Air</td>
            <td>
              <div>Edit</div>
              <div>Remove</div>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>VN972</td>
            <td>QAL003</td>
            <td>Mumbai</td>
            <td>Hanoi</td>
            <td>2024-05-05 23:46:00</td>
            <td>2024-05-06 01:45:00</td>
            <td>Delayed</td>
            <td>
              <div>Edit</div>
              <div>Remove</div>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>VN972</td>
            <td>QAL003</td>
            <td>Mumbai</td>
            <td>Hanoi</td>
            <td>2024-05-05 23:46:00</td>
            <td>2024-05-06 01:45:00</td>
            <td>In Air</td>
            <td>
              <div>Edit</div>
              <div>Remove</div>
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>VN972</td>
            <td>QAL003</td>
            <td>Mumbai</td>
            <td>Hanoi</td>
            <td>2024-05-05 23:46:00</td>
            <td>2024-05-06 01:45:00</td>
            <td>In Air</td>
            <td>
              <div>Edit</div>
              <div>Remove</div>
            </td>
          </tr>
          <tr>
            <td>7</td>
            <td>VN972</td>
            <td>QAL003</td>
            <td>Mumbai</td>
            <td>Hanoi</td>
            <td>2024-05-05 23:46:00</td>
            <td>2024-05-06 01:45:00</td>
            <td>In Air</td>
            <td>
              <div>Edit</div>
              <div>Remove</div>
            </td>
          </tr>
          <tr>
            <td>8</td>
            <td>VN972</td>
            <td>QAL003</td>
            <td>Mumbai</td>
            <td>Hanoi</td>
            <td>2024-05-05 23:46:00</td>
            <td>2024-05-06 01:45:00</td>
            <td>In Air</td>
            <td>
              <div>Edit</div>
              <div>Remove</div>
            </td>
          </tr>
          <tr>
            <td>9</td>
            <td>VN972</td>
            <td>QAL003</td>
            <td>Mumbai</td>
            <td>Hanoi</td>
            <td>2024-05-05 23:46:00</td>
            <td>2024-05-06 01:45:00</td>
            <td>In Air</td>
            <td>
              <div>Edit</div>
              <div>Remove</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FlightTable;
