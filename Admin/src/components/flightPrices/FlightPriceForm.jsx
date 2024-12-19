import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import {
  fetchFlightPriceByIdAPI,
  updateFlightPriceAPI,
  createFlightPriceAPI,
} from "../../services/API/FlightPrices";

const FlightPriceForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams(); // Get id from URL if available (for edit)

  const [isEdit, setIsEdit] = useState(false); // To check if it's in edit mode
  const [flightData, setFlightData] = useState(null); // Store flight data for editing

  // Fetch flight data if id is present (for editing)
  useEffect(() => {
    if (id) {
      fetchFlightPriceById(id);
    }
  }, [id]);

  const fetchFlightPriceById = async (id) => {
    try {
      const res = await fetchFlightPriceByIdAPI(id); // API call to fetch flight data
      if (res) {
        console.log(res); // Check the response data
        setFlightData(res); // Store the fetched flight data
        form.setFieldsValue({
          flightNumber: res.flightNumber, // Populate the form fields
          firstPrice: res.firstPrice,
          businessPrice: res.businessPrice,
          economyPrice: res.economyPrice,
        });
        setIsEdit(true); // Mark as edit mode
      } else {
        console.error("Flight not found.");
      }
    } catch (error) {
      console.error("Error fetching flight price data:", error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (isEdit) {
        // Update flight price if in edit mode
        const updatedData = await updateFlightPriceAPI({
          id,
          ...values,
        });
        notification.success({
          message: "Success",
          description: "Flight prices updated successfully",
        });
      } else {
        // Add flight price if creating new
        const newData = await createFlightPriceAPI(values);
        notification.success({
          message: "Success",
          description: "Flight prices added successfully",
        });
      }
      // Redirect to flights page after successful operation
      navigate("/flights");
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.response?.data?.error || "An error occurred",
      });
    }
  };

  return (
    <div>
      <h2>{isEdit ? "Edit Flight Prices" : "Add Flight Prices"}</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={flightData || {}} // Set initial values for the form
      >
        <Form.Item
          label="Flight Number"
          name="flightNumber"
          rules={[
            { required: true, message: "Please input the flight number!" },
          ]}
        >
          <Input disabled={isEdit} /> {/* Disable input in edit mode */}
        </Form.Item>

        <Form.Item
          label="First Price"
          name="firstPrice"
          rules={[
            { required: true, message: "Please input the first class price!" },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Business Price"
          name="businessPrice"
          rules={[
            {
              required: true,
              message: "Please input the business class price!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Economy Price"
          name="economyPrice"
          rules={[
            {
              required: true,
              message: "Please input the economy class price!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEdit ? "Update" : "Add"} Flight Prices
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FlightPriceForm;
