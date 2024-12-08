import React from "react";
import GeneralForm from "../ui/generalForm/GeneralForm";
import { createPlaneAPI } from "../../services/API/Planes"; // Import the createPlaneAPI function
import "./PlaneForm.css"; // Import CSS for PlaneForm

const PlaneForm = () => {
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

  const onFinish = async (values) => {
    console.log("Form Values:", values);
    const res = await createPlaneAPI(values);
    console.log("Plane created:", res);
    // Handle success, for example redirect or show success message
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Form Failed:", errorInfo);
  };

  return (
    <div className="plane-form-container">
      <h2>Create a Plane</h2>
      <GeneralForm
        fields={formFields}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        submitText="Create Plane"
        layout="horizontal" // Pass horizontal layout
      />
    </div>
  );
};

export default PlaneForm;
