import { Link } from "react-router-dom";
import FlightTable from "../../components/FlightTable/FlightTable";
import "./flightManagement.css";
import { IoAdd } from "react-icons/io5";

const FlightManagement = () => {
  return (
    <div className="flight-management">
      <div className="head-section">
        Flight Details
        <Link to="/schedule-flight">
          <div className="action">
            <button className="btn btn-main">
              <span>
                <IoAdd />
              </span>
              Schedule Flight
            </button>
          </div>
        </Link>
      </div>
      <FlightTable />
    </div>
  );
};

export default FlightManagement;
