import { Link } from "react-router-dom";
import AirplaneTable from "../../components/AirplaneTable/AirplaneTable";
import "./airplaneManagement.css";
import { IoAdd } from "react-icons/io5";

const AirplaneManagement = () => {
  return (
    <div className="airplane-management">
      <div className="head-section">
        Airplane Details
        <Link to="/add-airplane">
          <div className="action">
            <button className="btn btn-main">
              <span>
                <IoAdd />
              </span>
              Add Airplane
            </button>
          </div>
        </Link>
      </div>
      <AirplaneTable />
    </div>
  );
};

export default AirplaneManagement;
