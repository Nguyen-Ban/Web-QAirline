import React, { useState, useEffect } from "react";
import './FlightPriceForm.css'
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, notification, Select } from "antd";
import {
  fetchFlightsUnpricedAPI,
  fetchFlightPriceByIdAPI,
  updateFlightPriceAPI,
  createFlightPriceAPI,
} from "../../services/API/FlightPrices";

const FlightPriceForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams(); // Get id from URL if available (for edit)

  const [isEdit, setIsEdit] = useState(false); // To check if it's in edit mode
  const [availableFlights, setAvailableFlights] = useState([]);
  // Fetch flight data if id is present (for editing)

  useEffect(() => {
    fetchFlightNumbers();
  }, []);

  useEffect(() => {
    if (id) {
      fetchFlightPriceById(id);
    }
  }, [id]);

  const fetchFlightNumbers = async () => {
    try {
      const res = await fetchFlightsUnpricedAPI();
      if (res) {
        setAvailableFlights(res);
        form.setFieldsValue({
          ...res,
        });
      } else {
        console.error("Flight not found.");
      }
    } catch (error) {
      console.error("Error fetching available data:", error);
    }
  };

  const fetchFlightPriceById = async (id) => {
    try {
      const res = await fetchFlightPriceByIdAPI(id); // API call to fetch flight data
      if (res) {
        console.log(res); // Check the response data
        form.setFieldsValue(res);
        setIsEdit(true); // Mark as edit mode
      } else {
        console.error("Flight not found.");
      }
    } catch (error) {
      console.error("Error fetching flight price data:", error);
    }
  };

  const onFinish = async () => {
    const values = form.getFieldsValue(); // Lấy giá trị mới nhất từ form
    console.log("onfinish >>: ", values);
    try {
      let res;
      console.log("isEdit? >>", isEdit);
      if (isEdit) {
        values.id = id;
        console.log("values update >>: ", values);
        res = await updateFlightPriceAPI(values); // Gửi dữ liệu đã cập nhật
      } else {
        res = await createFlightPriceAPI(values);
      }

      notification.success({
        message: isEdit
          ? "Flight Price Updated Successfully!"
          : "Flight Price Created Successfully!",
        description: isEdit
          ? "The flight price has been updated."
          : "The flight price has been created.",
      });

      navigate("/flight-prices");
    } catch (error) {
      console.error("Error updating/creating flight price:", error);

      notification.error({
        message: isEditMode
          ? "Failed to Update Flight Price"
          : "Failed to Create Flight Price",
        description: "There was an error. Please try again later.",
      });
    }
  };

  return (
    <div>
      <h2>{isEdit ? "Edit Flight Prices" : "Add Flight Prices"}</h2>
      <Form className="flight-price-form" form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Flight Number"
          name="flightNumber"
          rules={[
            { required: true, message: "Please input the flight number!" },
          ]}
        >
          <Select placeholder="Select Flight Number">
            {availableFlights.length > 0 ? (
              availableFlights.map((flight) => (
                <Option key={flight.flightNumber} value={flight.flightNumber}>
                  {flight.flightNumber}
                </Option>
              ))
            ) : (
              <Option disabled value="">
                No Flight Numbers Available
              </Option>
            )}
          </Select>
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
