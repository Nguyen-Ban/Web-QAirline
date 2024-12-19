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

  
    </Card>
  );
};

export default UserProfile;
