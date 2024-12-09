import React from "react";
import GeneralForm from "../ui/generalForm/GeneralForm";

const PlaneForm = ({ onFinish, initialValues = {}, submitText }) => {
  const formFields = [
    {
      name: "planeCode",
      label: "Plane Code",
      type: "text",
      placeholder: "Enter plane code",
      rules: [{ required: true, message: "Plane code is required" }],
    },
    {
      name: "model",
      label: "Model",
      type: "text",
      placeholder: "Enter plane model",
      rules: [{ required: true, message: "Model is required" }],
    },
    {
      name: "manufacturer",
      label: "Manufacturer",
      type: "text",
      placeholder: "Enter manufacturer name",
      rules: [{ required: true, message: "Manufacturer is required" }],
    },
    {
      name: "seatCapacity",
      label: "Seat Capacity",
      type: "number",
      placeholder: "0",
      rules: [
        { required: true, message: "Seat capacity is required" },
        { pattern: /^[0-9]+$/, message: "Please enter a valid number" },
      ],
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>{submitText}</h2>
      <GeneralForm
        fields={formFields}
        initialValues={initialValues} // Dynamically set initial values
        onFinish={onFinish} // Pass internal submission handler
        submitText={submitText}
      />
    </div>
  );
};

export default PlaneForm;
