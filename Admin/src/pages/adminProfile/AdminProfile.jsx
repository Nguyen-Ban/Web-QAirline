import React from "react";
import ReactDOM from "react-dom";
import { Layout } from "antd";

import UserProfile from "../../components/profile/UserProfile";

const { Header, Content } = Layout;

const AdminProfile = () => {
  const user = {
    username: "John Doe",
    email: "johndoe@example.com",
    avatarUrl: "https://via.placeholder.com/100",
  };

  return (
    <div style={{ padding: "2rem" }}>
      <UserProfile user={user} />
    </div>
  );
};

export default AdminProfile;
