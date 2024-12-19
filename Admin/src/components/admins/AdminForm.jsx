import React from "react";
import { Form, Input, Button, Select, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { createAdminAPI } from "../../services/API/Admins";

const AdminForm = () => {
  const navigate = useNavigate();

  const formFields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      rules: [{ required: true, message: "Please enter the username!" }],
      placeholder: "Enter the admin's username",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      rules: [
        { required: true, message: "Please enter the email!" },
        { type: "email", message: "Please enter a valid email address!" },
      ],
      placeholder: "Enter the admin's email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      rules: [{ required: true, message: "Please enter a password!" }],
      placeholder: "Enter a secure password",
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      rules: [{ required: true, message: "Please select a role!" }],
      options: [{ value: "admin", label: "Admin" }],
      placeholder: "Select the user's role",
    },
  ];

  const onFinish = async (values) => {
    try {
      const res = await createAdminAPI(values); // Call API to create the admin
      Notification("success", "Create Admin Successfully!");
      navigate("/admins"); // Redirect to admins list or another page
    } catch (error) {
      console.error("Error creating admin:", error);
      Notification("error", "Failed to create Admin");
    }
  };

  const Notification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      {formFields.map((field) => (
        <Form.Item
          key={field.name}
          name={field.name}
          label={field.label}
          rules={field.rules}
          initialValue=""
        >
          {field.type === "select" ? (
            <Select placeholder={field.placeholder}>
              {field.options.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          ) : (
            <Input
              type={field.type}
              placeholder={field.placeholder}
              autoComplete="off"
            />
          )}
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Admin
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminForm;
