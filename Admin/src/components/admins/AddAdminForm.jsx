import React from "react";
import { createAdminAPI } from "../../services/API/Admins";
import AdminForm from "./AdminForm";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const AddAdminForm = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await createAdminAPI(values); // Call API to create the post
      Notification("success", "Create Admin Successfully!");

      navigate("/admins"); // Redirect to posts list or post details page
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

  return <AdminForm onFinish={onFinish} submitText="Create Admin" />;
};

export default AddAdminForm;
