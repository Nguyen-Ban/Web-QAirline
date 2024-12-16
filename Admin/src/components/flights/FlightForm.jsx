import React, { useState, useEffect } from "react";
import { Form, Input, Select, DatePicker, Button, notification } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchFlightByIdAPI,
  createFlightAPI,
  updateFlightAPI,
} from "../../services/API/Flights";

const { Option } = Select;

const FlightForm = ({ submitText = "Create Flight" }) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false); // Track if in edit mode
  const [availableDestinations, setAvailableDestinations] = useState([]); // Dynamic destinations
  const { id } = useParams(); // Get the flight ID from URL (if available)
  const navigate = useNavigate(); // For navigation after success

  const [departureTime, setDepartureTime] = useState(null); // Store departure time
  const [arrivalTime, setArrivalTime] = useState(null); // Store arrival time

  // Dummy data for departure/destination options
  const destinationsByDeparture = {
    NewYork: ["London", "Paris", "Berlin"],
    LosAngeles: ["Tokyo", "Sydney", "Vancouver"],
  };

  // Fetch flight data if in edit mode
  useEffect(() => {
    if (id) {
      setIsEditMode(true); // We're editing an existing flight
      fetchFlightData();
    }
  }, [id]);

  const fetchFlightData = async () => {
    try {
      const res = await fetchFlightByIdAPI(id); // API call to fetch flight by ID
      if (res) {
        setAvailableDestinations(destinationsByDeparture[res.departure] || []); // Set available destinations based on departure
        setDepartureTime(res.departureTime); // Set departure time
        setArrivalTime(res.arrivalTime); // Set arrival time
        form.setFieldsValue(res); // Set form fields with fetched flight data
      } else {
        console.error("Flight not found.");
      }
    } catch (error) {
      console.error("Error fetching flight data:", error);
    }
  };

  // Handle form submission for creating or updating flight
  const onFinish = async (values) => {
    try {
      let res;
      if (isEditMode) {
        values.id = id; // Add id for editing
        res = await updateFlightAPI(values); // API call to update flight
      } else {
        res = await createFlightAPI(values); // API call to create new flight
      }

      // Show success notification
      notification.success({
        message: isEditMode
          ? "Flight Updated Successfully!"
          : "Flight Created Successfully!",
        description: isEditMode
          ? "The flight has been updated."
          : "The flight has been created.",
      });

      // Redirect to the flights list or flight details page
      navigate("/flights");
    } catch (error) {
      console.error("Error updating/creating flight:", error);

      // Show error notification
      notification.error({
        message: isEditMode
          ? "Failed to Update Flight"
          : "Failed to Create Flight",
        description: "There was an error. Please try again later.",
      });
    }
  };

  // Handle departure change and set available destinations dynamically
  const handleDepartureChange = (value) => {
    setAvailableDestinations(destinationsByDeparture[value] || []);
    form.setFieldsValue({ destination: undefined }); // Reset destination
  };

  // Disable arrival time before departure time (same day logic)
  const disabledArrivalTime = (current) => {
    if (!departureTime) return false; // Allow any arrival time if departure is not set
    return current && current.isBefore(departureTime, "minute"); // Disable dates before departure
  };

  // Custom validation to ensure arrival time is strictly after departure time
  const validateArrivalTime = (rule, value) => {
    if (!departureTime || !value) {
      return Promise.resolve(); // Don't validate if no departure or arrival time is set
    }
    // Ensure arrival time is strictly after departure time (same day allowed)
    if (value.isBefore(departureTime, "minute")) {
      return Promise.reject(
        "Arrival time must be strictly after departure time."
      );
    }
    return Promise.resolve();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      {/* Flight Number */}
      <Form.Item
        name="flightNumber"
        label="Flight Number"
        rules={[{ required: true, message: "Flight number is required" }]}
      >
        <Input placeholder="Enter flight number" />
      </Form.Item>

      {/* Plane Name */}
      <Form.Item
        name="planeName"
        label="Plane Name"
        rules={[{ required: true, message: "Plane name is required" }]}
      >
        <Input placeholder="Enter plane name" />
      </Form.Item>

      {/* Departure */}
      <Form.Item
        name="departure"
        label="Departure"
        rules={[{ required: true, message: "Departure is required" }]}
      >
        <Select placeholder="Select departure" onChange={handleDepartureChange}>
          {["NewYork", "LosAngeles"].map((departure) => (
            <Option key={departure} value={departure}>
              {departure}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Destination */}
      <Form.Item
        name="destination"
        label="Destination"
        rules={[{ required: true, message: "Destination is required" }]}
      >
        <Select placeholder="Select destination">
          {availableDestinations.map((destination) => (
            <Option key={destination} value={destination}>
              {destination}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Departure Time */}
      <Form.Item
        name="departureTime"
        label="Departure Time"
        rules={[{ required: true, message: "Departure time is required" }]}
      >
        <DatePicker
          showTime
          style={{ width: "100%" }}
          format="YYYY-MM-DD HH:mm"
          onChange={(value) => setDepartureTime(value)}
        />
      </Form.Item>

      {/* Arrival Time */}
      <Form.Item
        name="arrivalTime"
        label="Arrival Time"
        rules={[
          { required: true, message: "Arrival time is required" },
          { validator: validateArrivalTime },
        ]}
      >
        <DatePicker
          showTime
          style={{ width: "100%" }}
          format="YYYY-MM-DD HH:mm"
          disabledDate={disabledArrivalTime} // Disable dates before departure time
          onChange={(value) => setArrivalTime(value)} // Set arrival time
        />
      </Form.Item>

      {/* Flight Status */}
      <Form.Item
        name="flightStatus"
        label="Flight Status"
        rules={[{ required: true, message: "Flight status is required" }]}
      >
        <Select placeholder="Select flight status">
          <Option value="Scheduled">Scheduled</Option>
          <Option value="Cancelled">Cancelled</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEditMode ? "Update Flight" : submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FlightForm;
