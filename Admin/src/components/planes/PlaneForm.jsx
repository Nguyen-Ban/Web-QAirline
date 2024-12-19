import React, { useState, useEffect } from "react";
import { Form, Input, Select, InputNumber, Button, notification } from "antd";
import { useParams, useNavigate } from "react-router-dom"; // for fetching URL params
import {
  fetchPlaneByIdAPI,
  createPlaneAPI,
  updatePlaneAPI,
} from "../../services/API/Planes"; // Plane APIs

const { Option } = Select;

const PlaneForm = ({ submitText = "Create Plane" }) => {
  const [form] = Form.useForm();
  const [availableModels, setAvailableModels] = useState([]);
  const [manufacturer, setManufacturer] = useState("");
  const [seatCapacity, setSeatCapacity] = useState(undefined);
  const [isEditMode, setIsEditMode] = useState(false); // To track whether we're in edit mode
  const { id } = useParams(); // Get the plane ID from URL (if available)
  const navigate = useNavigate(); // For navigation after success

  // Dummy model and seat capacity data based on manufacturer
  const modelsByManufacturer = {
    Boeing: ["737", "747", "787"],
    Airbus: ["A320", "A350", "A380"],
    "Lockheed Martin": ["F22", "C130"],
  };

  const seatCapacityByModel = {
    737: 80,
    747: 80,
    787: 80,
    A320: 80,
    A350: 80,
    A380: 80,
    F22: 80,
    C130: 80,
  };

  // Fetch existing plane data if in edit mode
  useEffect(() => {
    if (id) {
      setIsEditMode(true); // We are editing an existing plane
      fetchPlane();
    }
  }, [id]);

  const fetchPlane = async () => {
    try {
      const res = await fetchPlaneByIdAPI(id); // API call to fetch the plane by ID
      if (res) {
        setManufacturer(res.manufacturer);
        setSeatCapacity(res.seatCapacity);
        setAvailableModels(modelsByManufacturer[res.manufacturer] || []);
        form.setFieldsValue(res); // Set the form fields with the fetched plane data
      } else {
        console.error("Plane not found.");
      }
    } catch (error) {
      console.error("Error fetching plane data:", error);
    }
  };

  // Handle form submission for creating or updating the plane
  const onFinish = async (values) => {
    try {
      let res;
      if (isEditMode) {
        values.id = id; // Add id for editing
        res = await updatePlaneAPI(values); // Call API to update the plane
      } else {
        res = await createPlaneAPI(values); // Call API to create the plane
      }

      // Show success notification
      notification.success({
        message: isEditMode
          ? "Plane Updated Successfully!"
          : "Plane Created Successfully!",
        description: isEditMode
          ? "The plane data has been updated."
          : "The new plane has been created.",
      });

      // Redirect to the planes list or plane details page
      navigate("/planes");
    } catch (error) {
      console.error("Error updating/creating plane:", error);

      // Show error notification
      notification.error({
        message: isEditMode
          ? "Failed to Update Plane"
          : "Failed to Create Plane",
        description: "There was an error. Please try again later.",
      });
    }
  };

  const handleManufacturerChange = (value) => {
    setManufacturer(value);
    setAvailableModels(modelsByManufacturer[value] || []);
    form.setFieldsValue({ model: undefined, seatCapacity: undefined }); // Reset model and seat capacity
  };

  const handleModelChange = (value) => {
    setSeatCapacity(seatCapacityByModel[value]);
    form.setFieldsValue({ seatCapacity: seatCapacityByModel[value] });
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ seatCapacity: 100 }} // Default value for seat capacity
    >
      {/* Plane Code */}
      <Form.Item
        name="planeCode"
        label="Plane Code"
        rules={[{ required: true, message: "Plane code is required" }]}
      >
        <Input placeholder="Enter plane code" />
      </Form.Item>

      {/* Manufacturer */}
      <Form.Item
        name="manufacturer"
        label="Manufacturer"
        rules={[{ required: true, message: "Manufacturer is required" }]}
      >
        <Select
          placeholder="Select manufacturer"
          onChange={handleManufacturerChange}
        >
          {["Boeing", "Airbus", "Lockheed Martin"].map((manufacturer) => (
            <Option key={manufacturer} value={manufacturer}>
              {manufacturer}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Model */}
      <Form.Item
        name="model"
        label="Model"
        rules={[{ required: true, message: "Model is required" }]}
      >
        <Select placeholder="Select model" onChange={handleModelChange}>
          {availableModels.map((model) => (
            <Option key={model} value={model}>
              {model}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Seat Capacity */}
      <Form.Item
        name="seatCapacity"
        label="Seat Capacity"
        rules={[
          { required: true, message: "Seat capacity is required" },
          { pattern: /^[0-9]+$/, message: "Please enter a valid number" },
        ]}
      >
        <InputNumber min={1} value={seatCapacity} disabled />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEditMode ? "Update Plane" : submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PlaneForm;
