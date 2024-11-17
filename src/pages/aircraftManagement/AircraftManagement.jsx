import { Link } from "react-router-dom";
import AircraftTable from "../../components/aircraftManagement/aircraftTable/AircraftTable";
import "./aircraftManagement.css";
import { IoAdd } from "react-icons/io5";

const AircraftManagement = () => {
  return (
    <div className="aircraft-management">
      <div className="head-section">
        Aircraft Details
        <Link to="/add-aircraft">
          <div className="action">
            <button className="btn btn-main">
              <span>
                <IoAdd />
              </span>
              Add Aircraft
            </button>
          </div>
        </Link>
      </div>
      <AircraftTable />
    </div>
  );
};

export default AircraftManagement;
