import React from "react";
import GeneralForm from "../ui/generalForm/GeneralForm";
import { createFlightAPI } from "../../services/API/Flights"; // Import the createFlightAPI function
import { notification } from "antd"; // Import notification from Ant Design

const FlightForm = () => {
  const formFields = [
    {
      name: "flightNumber",
      label: "Flight Number",
      type: "text",
      placeholder: "Enter flight number",
      rules: [{ required: true, message: "Flight number is required" }],
    },
    {
      name: "departure",
      label: "Departure",
      type: "text",
      placeholder: "Enter departure location",
      rules: [{ required: true, message: "Departure location is required" }],
    },
    {
      name: "destination",
      label: "Destination",
      type: "text",
      placeholder: "Enter destination location",
      rules: [{ required: true, message: "Destination location is required" }],
    },
    {
      name: "departureTime",
      label: "Departure Time",
      type: "datepicker",
      rules: [{ required: true, message: "Departure time is required" }],
    },
    {
      name: "arrivalTime",
      label: "Arrival Time",
      type: "datepicker",
      rules: [{ required: true, message: "Arrival time is required" }],
    },
    {
      name: "status",
      label: "Flight Status",
      type: "select",
      options: [
        { label: "Scheduled", value: "Scheduled" },
        { label: "On-time", value: "On-time" },
        { label: "Delayed", value: "Delayed" },
        { label: "Cancelled", value: "Cancelled" },
      ],
      rules: [{ required: true, message: "Flight status is required" }],
    },
  ];

  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const onFinish = async (values) => {
    console.log("Form Values:", values);
    try {
      const res = await createFlightAPI(values); // Call createFlightAPI with form values
      console.log("Flight created:", res);

      // Check the result and show notification accordingly
      if (res && res.data) {
        openNotification(
          "success",
          "Flight Created Successfully!",
          "Your flight has been successfully created."
        );
      } else {
        openNotification(
          "error",
          "Flight Creation Failed",
          "The response was invalid. Please try again."
        );
      }
    } catch (error) {
      console.error("Error creating flight:", error);
      openNotification(
        "error",
        "Flight Creation Failed",
        "An error occurred while creating the flight."
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create a Flight</h2>
      <GeneralForm
        fields={formFields}
        onFinish={onFinish} // Pass onFinish directly
        submitText="Create Flight"
      />
    </div>
  );
};

export default FlightForm;
