import "./header.css";
import { IoIosMenu } from "react-icons/io";

const Header = () => {
  return (
    <div className="header">
      <div className="title">
        <label htmlFor="">
          <span className="sidebar-toggle-icon">
            <IoIosMenu />
          </span>
        </label>
        <div>
          <h1>Title</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
