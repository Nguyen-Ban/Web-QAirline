import React, { useState, useEffect } from "react";
import { Form, Input, Select, DatePicker, Button, notification } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchFlightByIdAPI,
  createFlightAPI,
  updateFlightAPI,
} from "../../services/API/Flights";
import moment from "moment";
import dayjs from "dayjs";
import { fetchPlaneCodesAPI } from "../../services/API/Planes";

const { Option } = Select;

const FlightForm = ({ submitText = "Create Flight" }) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [availableDestinations, setAvailableDestinations] = useState([]);
  const [availablePlanes, setAvailablePlanes] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const [originalDepartureTime, setOriginalDepartureTime] = useState(null);
  const [departureTime, setDepartureTime] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(null);
  const [status, setStatus] = useState(""); // Để lưu trữ trạng thái chuyến bay

  const handleCancelFlight = () => {
    setStatus("cancelled"); // Cập nhật status thành 'cancelled' khi nhấn nút
    form.setFieldsValue({ status: "cancelled" }); // Cập nhật giá trị status trong form
  };

  const destinationsByDeparture = [
    { departure: "New York", destinations: ["London", "Paris", "Berlin", "Tokyo", "Munich"] },
    { departure: "Los Angeles", destinations: ["Tokyo", "Sydney", "Vancouver", "Hanoi", "Seoul"] },
    { departure: "London", destinations: ["New York", "Paris", "Berlin", "Ho Chi Minh City", "Munich"] },
    { departure: "Hanoi", destinations: ["Ho Chi Minh City", "Da Nang", "Tokyo", "Sydney", "Seoul"] },
    { departure: "Ho Chi Minh City", destinations: ["Hanoi", "Da Nang", "Bangkok", "Singapore", "Seoul"] },
    { departure: "Tokyo", destinations: ["Los Angeles", "Sydney", "Seoul", "Hanoi", "Munich"] },
    { departure: "Sydney", destinations: ["Los Angeles", "Tokyo", "Hanoi", "Da Nang", "Munich"] },
    { departure: "Da Nang", destinations: ["Hanoi", "Ho Chi Minh City", "Singapore", "Bangkok", "Seoul"] },
    { departure: "Seoul", destinations: ["Tokyo", "Hanoi", "Ho Chi Minh City", "Munich", "Los Angeles"] },
    { departure: "Munich", destinations: ["New York", "London", "Berlin", "Tokyo", "Seoul"] },
    { departure: "Bangkok", destinations: ["Ho Chi Minh City", "Paris", "Berlin", "Tokyo", "Munich"] },

  ];
  

  useEffect(() => {
    fetchPlaneCodes();
  }, []);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchFlightData();
    }
  }, [id]);

  const fetchPlaneCodes = async () => {
    try {
      const res = await fetchPlaneCodesAPI();
      if (res) {
        setAvailablePlanes(res);
        form.setFieldsValue({
          ...res,
        });
      } else {
        console.error("Plane not found.");
      }
    } catch (error) {
      console.error("Error fetching available data:", error);
    }
  };

  const fetchFlightData = async () => {
    try {
      const res = await fetchFlightByIdAPI(id);
      if (res) {
        setAvailableDestinations(destinationsByDeparture[res.departure] || []);
        setOriginalDepartureTime(dayjs(res.departureTime));
        setDepartureTime(res.departureTime);
        setArrivalTime(res.arrivalTime);
        form.setFieldsValue({
          ...res,
        });
      } else {
        console.error("Flight not found.");
      }
    } catch (error) {
      console.error("Error fetching flight data:", error);
    }
  };

  const onFinish = async () => {
    const values = form.getFieldsValue(); // Lấy giá trị mới nhất từ form
    console.log("onfinish >>: ", values);
    try {
      let res;
      console.log("isEdit? >>", isEditMode);
      if (isEditMode) {
        values.id = id;
        console.log("values update >>: ", values);
        res = await updateFlightAPI(values); // Gửi dữ liệu đã cập nhật
      } else {
        res = await createFlightAPI(values);
      }

      notification.success({
        message: isEditMode
          ? "Flight Updated Successfully!"
          : "Flight Created Successfully!",
        description: isEditMode
          ? "The flight has been updated."
          : "The flight has been created.",
      });

      navigate("/flights");
    } catch (error) {
      console.error("Error updating/creating flight:", error);

      notification.error({
        message: isEditMode
          ? "Failed to Update Flight"
          : "Failed to Create Flight",
        description: "There was an error. Please try again later.",
      });
    }
  };

  const getDestinationsByDeparture = (departure) => {
    const match = destinationsByDeparture.find(
      (item) => item.departure === departure
    );
    return match ? match.destinations : [];
  };

  const handleDepartureChange = (value) => {
    const destinations = getDestinationsByDeparture(value);
    setAvailableDestinations(destinations);
    form.setFieldsValue({ destination: undefined });
    setArrivalTime(null);
  };

  // Disable departure time: must be at least 24 hours ahead of current time
  const disabledDate = (current) => {
    const now = dayjs();
    return current && current.isBefore(now);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="flightNumber"
        label="Flight Number"
        rules={[
          { required: true, message: "Flight number is required" },
          {
            pattern: /^QA\d+$/, // Regex kiểm tra bắt đầu bằng QA và theo sau bởi một hoặc nhiều chữ số
            message: "Flight number must start with 'QA' followed by digits",
          },
        ]}
      >
        <Input placeholder="Enter flight number" />
      </Form.Item>

      <Form.Item
        name="planeCode"
        label="Plane Code"
        rules={[{ required: true, message: "Plane Code is required" }]}
      >
        <Select placeholder="Select Plane Code">
          {availablePlanes.length > 0 ? (
            availablePlanes.map((plane) => (
              <Option key={plane.planeCode} value={plane.planeCode}>
                {plane.planeCode}
              </Option>
            ))
          ) : (
            <Option disabled value="">
              No Plane Codes Available
            </Option>
          )}
        </Select>
      </Form.Item>

      <Form.Item
        name="departure"
        label="Departure"
        rules={[{ required: true, message: "Departure is required" }]}
      >
        <Select placeholder="Select departure" onChange={handleDepartureChange}>
          {destinationsByDeparture.map((item) => (
            <Option key={item.departure} value={item.departure}>
              {item.departure}
            </Option>
          ))}
        </Select>
      </Form.Item>

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

      <Form.Item
        name="departureTime"
        label="Departure Time"
        rules={[
          { required: true, message: "Departure time is required" },
          () => ({
            validator(_, value) {
              const now = dayjs();
              if (!value || value.isAfter(now.add(24, "hour"))) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  `Departure time must be at least 24 hours from now. Current time: ${now.format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}`
                )
              );
            },
          }),
        ]}
      >
        <DatePicker
          showTime
          style={{ width: "100%" }}
          format="YYYY-MM-DD HH:mm"
          disabledDate={disabledDate}
        />
      </Form.Item>

      <Form.Item
        name="arrivalTime"
        label="Arrival Time"
        rules={[
          { required: true, message: "Arrival time is required" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              const departureTime = getFieldValue("departureTime");
              if (
                !value ||
                !departureTime ||
                value.isAfter(dayjs(departureTime).add(1, "hour"))
              ) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  "Arrival time must be at least 1 hour later than departure time"
                )
              );
            },
          }),
        ]}
      >
        <DatePicker
          showTime
          style={{ width: "100%" }}
          format="YYYY-MM-DD HH:mm"
          disabledDate={disabledDate}
          onChange={(value) => setArrivalTime(value)}
        />
      </Form.Item>
      {isEditMode ? (
        <Form.Item name="status" label="Status" layout="horizontal">
          <Button
            onClick={handleCancelFlight}
            style={
              status === "cancelled"
                ? {
                    backgroundColor: "red",
                    color: "black",
                    fontWeight: "bold",
                  }
                : {
                    backgroundColor: "white",
                    color: "blue",
                  }
            }
          >
            {status === "cancelled" ? "Flight Cancelled" : "Cancel Flight"}
          </Button>
        </Form.Item>
      ) : (
        ""
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEditMode ? "Update Flight" : submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FlightForm;
