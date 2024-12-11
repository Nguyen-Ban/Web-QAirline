import { Form } from "antd";
import React, { useState } from "react";
import { Card, Avatar, Input, Button, Row, Col, Typography } from "antd";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const UserProfile = ({ user }) => {
  const [editingField, setEditingField] = useState(null); // Track which field is being edited
  const [username, setUsername] = useState(user.username); // Current username
  const [email, setEmail] = useState(user.email); // Current email
  const [confirmedUsername, setConfirmedUsername] = useState(user.username); // Confirmed username
  const [confirmedEmail, setConfirmedEmail] = useState(user.email); // Confirmed email

  const handleEditClick = (field) => {
    // Only allow switching fields if no field is being edited
    if (editingField === field) {
      // If the same field is clicked again, toggle off
      setEditingField(null);
    } else {
      setEditingField(field);
    }
  };

  const handleConfirmEdit = (field) => {
    if (field === "username") {
      setConfirmedUsername(username); // Sync username with confirmedUsername
    } else if (field === "email") {
      setConfirmedEmail(email); // Sync email with confirmedEmail
    }
    setEditingField(null); // Exit editing mode for the current field
  };

  const handleSave = () => {
    // Send confirmed values to the backend
    console.log("Saving new values:", {
      username: confirmedUsername,
      email: confirmedEmail,
    });
    // Reset fields to confirmed state
    setUsername(confirmedUsername);
    setEmail(confirmedEmail);
  };

  const handleDiscard = () => {
    // Reset fields to initial values (original user data)
    setUsername(user.username);
    setEmail(user.email);
    setConfirmedUsername(user.username);
    setConfirmedEmail(user.email);
    setEditingField(null); // Exit editing mode
  };

  // Show buttons only if confirmed values differ from original
  const hasChanges =
    confirmedUsername !== user.username || confirmedEmail !== user.email;

  return (
    <Card style={{ width: "100%", maxWidth: "600px", margin: "auto" }}>
      <Row gutter={16}>
        {/* Avatar and Upload Section */}
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
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => alert("Upload avatar logic")}
            >
              Upload
            </Button>
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
                {editingField === "username" ? (
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Update username state
                  />
                ) : (
                  <Text>{confirmedUsername}</Text>
                )}
              </Col>
              <Col span={2}>
                {editingField === "username" ? (
                  <Button
                    type="link"
                    icon={<CheckOutlined />}
                    onClick={() => handleConfirmEdit("username")}
                  />
                ) : (
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => handleEditClick("username")}
                  />
                )}
              </Col>
            </Row>

            {/* Email */}
            <Row style={{ marginTop: 12 }}>
              <Col span={8}>
                <Text strong>Email:</Text>
              </Col>
              <Col span={14}>
                {editingField === "email" ? (
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state
                  />
                ) : (
                  <Text>{confirmedEmail}</Text>
                )}
              </Col>
              <Col span={2}>
                {editingField === "email" ? (
                  <Button
                    type="link"
                    icon={<CheckOutlined />}
                    onClick={() => handleConfirmEdit("email")}
                  />
                ) : (
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => handleEditClick("email")}
                  />
                )}
              </Col>
            </Row>
          </div>

          {/* Save and Discard Buttons */}
          {hasChanges && (
            <div
              style={{
                marginTop: 24,
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <Button type="primary" onClick={handleSave}>
                Save Changes
              </Button>
              <Button onClick={handleDiscard} danger>
                Discard
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default UserProfile;

{
  /* Password
            <Row style={{ marginTop: 12 }}>
              <Col span={8}>
                <Text strong>Password:</Text>
              </Col>
              <Col span={16}>
                {passwordEditing ? (
                  <div>
                    <Input.Password
                      placeholder="Current Password"
                      style={{ marginBottom: 8 }}
                    />
                    <Input.Password
                      placeholder="New Password"
                      style={{ marginBottom: 8 }}
                    />
                    <Input.Password placeholder="Confirm New Password" />
                  </div>
                ) : (
                  <Text>********</Text>
                )}
                <Button
                  type="link"
                  icon={passwordEditing ? <CheckOutlined /> : <EditOutlined />}
                  onClick={handlePasswordEditClick}
                />
              </Col>
            </Row>
          </div> */
}
