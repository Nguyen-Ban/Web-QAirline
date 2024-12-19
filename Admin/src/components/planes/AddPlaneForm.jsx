import React from "react";
import { createPlaneAPI } from "../../services/API/Planes"; // Plane creation API
import PlaneForm from "./PlaneForm"; // Reuse PlaneForm for creating plane
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const AddPlaneForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await createPlaneAPI(values); // Call API to create the plane
      Notification("success", "Plane Created Successfully!");

      navigate("/planes"); // Redirect to planes list or plane details page
    } catch (error) {
      console.error("Error creating plane:", error);
      Notification("error", "Failed to create Plane");
    }
  };

  const Notification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  return (
    <PlaneForm
      onFinish={onFinish} // Pass the form submission handler
      submitText="Create Plane" // Button text for creating plane
    />
  );
};

export default AddPlaneForm;
