import { MdOutlineMenu } from "react-icons/md";
import "./Header.css";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "../../../constants/themeConstants";
import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../../../contexts/SidebarContext";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { IoIosNotifications } from "react-icons/io";
import { FiSun } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";
import { CgMenu } from "react-icons/cg";

import avatar from "../../../assets/images/avatar.jpg";
import { AuthContext } from "../../../contexts/AuthContext";

const Header = () => {
  const { openSidebar } = useContext(SidebarContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const { user } = useContext(AuthContext);

  console.log(user);

  return (
    <div className="header">
      <div className="header-left">
        <div className="item" onClick={openSidebar}>
          <CgMenu className="icon" />
        </div>
      </div>
      <div className="header-right">
        <div className="item notification">
          <span className="icon-badge">2</span>
          <IoIosNotifications className="icon" />
        </div>
        <div className="item theme-toggle-btn" onClick={toggleTheme}>
          <div className="theme-icon">
            {theme === LIGHT_THEME ? (
              <FiSun className="icon" />
            ) : (
              <FaRegMoon className="icon" />
            )}
          </div>
        </div>
        <div className="item avatar-item">
          <img src={avatar} alt="avatar" className="avatar" />
        </div>
      </div>
    </div>
  );
};

export default Header;
