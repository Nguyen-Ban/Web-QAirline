import React, { useState } from "react";
import {
  Card,
  Avatar,
  Row,
  Col,
  Typography,
  Button,
  Modal,
  Input,
  Dropdown,
  Menu,
} from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const UserProfile = ({ user }) => {
  const [isEditProfileModalVisible, setIsEditProfileModalVisible] =
    useState(false);
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] =
    useState(false);

  // For Edit Profile
  const [newUsername, setNewUsername] = useState(user.username);
  const [newEmail, setNewEmail] = useState(user.email);

  // For Change Password
  const [currentPassword, setCurrentPassword] = useState(""); // Current password
  const [newPassword, setNewPassword] = useState(""); // New password
  const [confirmNewPassword, setConfirmNewPassword] = useState(""); // Confirm new password

  // Handle Edit Profile Save
  const handleEditProfileSave = () => {
    console.log("Editing profile:", { newUsername, newEmail });
    setIsEditProfileModalVisible(false);
  };

  // Handle Change Password Save
  const handleChangePasswordSave = () => {
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match!");
    } else {
      console.log("Changing password:", { currentPassword, newPassword });
      setIsChangePasswordModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsEditProfileModalVisible(false);
    setIsChangePasswordModalVisible(false);
  };

  // Menu for Dropdown
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => setIsEditProfileModalVisible(true)}>
        Edit Profile
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setIsChangePasswordModalVisible(true)}>
        Change Password
      </Menu.Item>
    </Menu>
  );

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "auto",
        position: "relative",
      }}
    >
      <Row gutter={16}>
        {/* Avatar Section */}
        <Col span={6}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              size={100}
              src={user.avatarUrl || "https://via.placeholder.com/100"}
              style={{ marginBottom: 16 }}
            />
          </div>
        </Col>

        {/* User Info Section */}
        <Col span={18}>
          <Title level={4}>User Profile</Title>

          <div>
            {/* Username */}
            <Row>
              <Col span={8}>
                <Text strong>Username:</Text>
              </Col>
              <Col span={14}>
                <Text>{user.username}</Text>
              </Col>
            </Row>

            {/* Email */}
            <Row style={{ marginTop: 12 }}>
              <Col span={8}>
                <Text strong>Email:</Text>
              </Col>
              <Col span={14}>
                <Text>{user.email}</Text>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* Dropdown Button for Edit Profile and Change Password */}
      <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
        <Button
          type="link"
          icon={<DownOutlined />}
          style={{ position: "absolute", top: 16, right: 16 }}
        >
          Manage Profile
        </Button>
      </Dropdown>

      {/* Modal for Edit Profile */}
      <Modal
        title="Edit Profile"
        visible={isEditProfileModalVisible}
        onOk={handleEditProfileSave}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
        centered
      >
        {/* Username */}
        <Input
          placeholder="New Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          style={{ marginBottom: 8 }}
        />
        {/* Email */}
        <Input
          placeholder="New Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </Modal>

      {/* Modal for Change Password */}
      <Modal
        title="Change Password"
        visible={isChangePasswordModalVisible}
        onOk={handleChangePasswordSave}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
        centered
      >
        {/* Current Password */}
        <Input.Password
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          style={{ marginBottom: 8 }}
        />
        {/* New Password */}
        <Input.Password
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ marginBottom: 8 }}
        />
        {/* Confirm New Password */}
        <Input.Password
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </Modal>
    </Card>
  );
};

export default UserProfile;
