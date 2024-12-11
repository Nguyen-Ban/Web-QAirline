import React from "react";
import GeneralForm from "../ui/generalForm/GeneralForm";
import { notification } from "antd"; // Notification from Ant Design

const AdminForm = ({ onFinish, initialValues = {}, submitText }) => {
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

  return (
    <div style={{ padding: "20px" }}>
      <h2>{submitText}</h2>
      <GeneralForm
        fields={formFields}
        initialValues={initialValues} // Dynamically set initial values
        onFinish={onFinish} // Pass the internal submission handler
        submitText={submitText}
      />
    </div>
  );
};

export default AdminForm;
