import React from "react";
import GeneralForm from "../ui/generalForm/GeneralForm";

const FlightForm = () => {
  const formFields = [
    {
      name: "flightCode",
      label: "Flight Code",
      type: "input",
      placeholder: "Enter flight code",
      rules: [{ required: true, message: "Flight code is required" }],
    },
    {
      name: "planeCode",
      label: "Plane Code",
      type: "input",
      placeholder: "Enter plane code",
      rules: [{ required: true, message: "Plane code is required" }],
    },
    {
      name: "departure",
      label: "Departure",
      type: "input",
      placeholder: "Enter departure location",
      rules: [{ required: true, message: "Departure is required" }],
    },
    {
      name: "destination",
      label: "Destination",
      type: "input",
      placeholder: "Enter destination",
      rules: [{ required: true, message: "Destination is required" }],
    },
    {
      name: "departureTime",
      label: "Departure Time",
      type: "datetime",
      rules: [{ required: true, message: "Departure time is required" }],
    },
    {
      name: "arrivalTime",
      label: "Arrival Time",
      type: "datetime",
      rules: [{ required: true, message: "Arrival time is required" }],
    },
    {
      name: "flightStatus",
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

  const onFinish = (values) => {
    console.log("Form Values:", values);
    // Logic to handle the form submission, like calling an API to create a flight
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Form Failed:", errorInfo);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create a Flight</h2>
      <GeneralForm
        fields={formFields}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        submitText="Create Flight"
      />
    </div>
  );
};

export default FlightForm;
