import Chart from "../../components/chart/Chart";
import Widget from "../../components/widget/Widget";
import { IoIosMenu } from "react-icons/io";
import { IoAdd } from "react-icons/io5";

import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="head-section">
        <div className="title">
          <label htmlFor="">
            <span className="sidebar-toggle-icon">
              <IoIosMenu />
            </span>
          </label>
          <div>
            <h1>Dashboard</h1>
          </div>
        </div>
        <div className="action">
          <button className="btn btn-main">
            <span>
              <IoAdd />
            </span>
            Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
