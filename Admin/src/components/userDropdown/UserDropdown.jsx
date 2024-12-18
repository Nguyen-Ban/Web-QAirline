import React, { useContext } from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const UserDropdown = () => {
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logout();
    navigate("/login");
  };
  // Menu items for the dropdown
  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile"> {user.email} </Link>
      </Menu.Item>
      <Menu.Item key="logout" danger onClick={() => handleLogOut()}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Avatar size={40} icon={<UserOutlined />} style={{ cursor: "pointer" }} />
    </Dropdown>
  );
};

export default UserDropdown;
