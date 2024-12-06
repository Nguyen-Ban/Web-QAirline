import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { LIGHT_THEME } from "../../../constants/themeConstants";
import { MdOutlineHighQuality } from "react-icons/md";

import {
  MdOutlineAttachMoney,
  MdOutlineBarChart,
  MdOutlineClose,
  MdOutlineCurrencyExchange,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlineMessage,
  MdOutlinePeople,
  MdOutlineSettings,
  MdOutlineShoppingBag,
  MdOutlinePostAdd,
} from "react-icons/md";
import { IoAirplane } from "react-icons/io5";
import { GrSchedules } from "react-icons/gr";

import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css";
import { SidebarContext } from "../../../contexts/SidebarContext";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <MdOutlineHighQuality className="icon" />
          <span className="sidebar-brand-text">QAirline.</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose className="icon" />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <NavLink to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineGridView className="icon" />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink to="/posts" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlinePostAdd className="icon" />
                </span>
                <span className="menu-link-text">Posts</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink to="/planes" className="menu-link">
                <span className="menu-link-icon">
                  <IoAirplane className="icon" />
                </span>
                <span className="menu-link-text">Airplanes</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink to="/flights" className="menu-link">
                <span className="menu-link-icon">
                  <GrSchedules className="icon" />
                </span>
                <span className="menu-link-text">Flights</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink to="/#" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlinePeople className="icon" />
                </span>
                <span className="menu-link-text">Customer</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineSettings className="icon" />
                </span>
                <span className="menu-link-text">Settings</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineLogout className="icon" />
                </span>
                <span className="menu-link-text">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
