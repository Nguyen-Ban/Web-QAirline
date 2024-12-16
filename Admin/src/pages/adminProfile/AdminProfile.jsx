import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { Layout } from "antd";

import UserProfile from "../../components/profile/UserProfile";
import { AuthContext } from "../../contexts/AuthContext";

const { Header, Content } = Layout;

const AdminProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ padding: "2rem" }}>
      <UserProfile user={user} />
    </div>
  );
};

export default AdminProfile;
