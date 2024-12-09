import React from "react";
import GeneralForm from "../ui/generalForm/GeneralForm"; // General form component

const FlightForm = ({ onFinish, initialValues = {}, submitText }) => {
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

  return (
    <div style={{ padding: "20px" }}>
      <h2>{submitText}</h2>
      <GeneralForm
        fields={formFields}
        initialValues={initialValues} // Dynamically set initial values for editing
        onFinish={onFinish} // Pass onFinish to handle form submission
        submitText={submitText} // Pass the submit text (Create or Update)
      />
    </div>
  );
};

export default FlightForm;
