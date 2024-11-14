import "./sidebar.css";
import avatarImg from "../../assets/img/avatar.jpg";
import { NavLink } from "react-router-dom";
import { MdHighQuality } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { TfiDashboard } from "react-icons/tfi";
import { MdOutlinePostAdd } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaPlane } from "react-icons/fa";
import { FaPersonWalkingLuggage } from "react-icons/fa6";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="brand">
          <h2>
            <span className="brand-icon">
              <MdHighQuality />
            </span>
            QAirline
          </h2>
        </div>
        <div className="avatar">
          <div className="avatar-img">
            <img src={avatarImg} alt="avatar" />
          </div>
          <div className="avatar-info">
            <div className="avatar-text">
              <h4>Admin1</h4>
            </div>
            <span className="arrow-down">
              <FaAngleDown />
            </span>
          </div>
        </div>

        <div className="menu">
          <ul>
            <NavLink to="/">
              <li>
                <span className="dashboard-icon">
                  <TfiDashboard />
                </span>
                <span>Dashboard</span>
              </li>
            </NavLink>
            <NavLink to="/post-management">
              <li>
                <span className="post-icon">
                  <MdOutlinePostAdd />
                </span>
                <span>Post Management</span>
              </li>
            </NavLink>

            <NavLink to="/aircraft-management">
              <li>
                <span className="aircraft-icon">
                  <FaPlane />
                </span>
                <span>Aircraft Management</span>
              </li>
            </NavLink>
            <NavLink to="/flight-management">
              <li>
                <span className="flight-icon">
                  <AiOutlineSchedule />
                </span>
                <span>Flight Management</span>
              </li>
            </NavLink>

            <li>
              <span className="passenger-icon">
                <FaPersonWalkingLuggage />
              </span>
              <span>Passenger Lists</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
