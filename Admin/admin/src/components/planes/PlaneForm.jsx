import React from "react";
import GeneralForm from "../ui/generalForm/GeneralForm";

const PlaneForm = () => {
  const formFields = [
    {
      name: "planeCode",
      label: "Plane Code",
      type: "input",
      placeholder: "Enter plane code",
      rules: [{ required: true, message: "Plane code is required" }],
    },
    {
      name: "model",
      label: "Model",
      type: "input",
      placeholder: "Enter plane model",
      rules: [{ required: true, message: "Model is required" }],
    },
    {
      name: "manufacturer",
      label: "Manufacturer",
      type: "input",
      placeholder: "Enter manufacturer name",
      rules: [{ required: true, message: "Manufacturer is required" }],
    },
    {
      name: "seat_capacity",
      label: "Seat Capacity",
      type: "input",
      placeholder: "Enter seat capacity",
      rules: [
        { required: true, message: "Seat capacity is required" },
        { pattern: /^[0-9]+$/, message: "Please enter a valid number" },
      ],
    },
  ];

  const onFinish = (values) => {
    console.log("Form Values:", values);
    // Logic to handle the form submission, like calling an API to create a plane
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Form Failed:", errorInfo);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create a Plane</h2>
      <GeneralForm
        fields={formFields}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        submitText="Create Plane"
      />
    </div>
  );
};

export default PlaneForm;
