import "./Header.css";

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
import UserDropdown from "../../userDropdown/UserDropdown";
import { MdOutlineHighQuality } from "react-icons/md";

const Header = () => {
  const { openSidebar } = useContext(SidebarContext);

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
        <UserDropdown />
        {/* <div className="item avatar-item">
          <img src={avatar} alt="avatar" className="avatar" />
        </div> */}
      </div>
    </div>
  );
};

export default Header;
