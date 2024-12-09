import React from "react";
import { createFlightAPI } from "../../services/API/Flights"; // Import the flight creation API
import FlightForm from "./FlightForm"; // Reuse FlightForm for creating a flight
import { notification } from "antd"; // Ant Design notification for success/error messages
import { useNavigate } from "react-router-dom"; // React Router's useNavigate for redirection

const AddFlightForm = () => {
  const navigate = useNavigate(); // Navigate to another route after creation

  // Handle form submission
  const onFinish = async (values) => {
    try {
      const res = await createFlightAPI(values); // Call API to create the flight
      Notification(
        "success",
        "Flight Created Successfully!",
        "Your flight has been successfully created."
      );

      navigate("/flights"); // Redirect to the flights list or flight details page
    } catch (error) {
      console.error("Error creating flight:", error);
      Notification(
        "error",
        "Failed to create Flight",
        "An error occurred while creating the flight."
      );
    }
  };

  // Custom notification function to handle success/error messages
  const Notification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  return (
    <FlightForm
      onFinish={onFinish} // Pass the form submission handler
      submitText="Create Flight" // Button text for creating flight
    />
  );
};

export default AddFlightForm;
