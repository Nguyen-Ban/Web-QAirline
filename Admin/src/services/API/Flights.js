// FlightApi.js
import axios from "../axios.customize.js";
import dayjs from "dayjs";

const fetchFlightsAPI = async () => {
  const URL = "/api/users/flights-admin"; // Đường dẫn API cho flights
  const data = await axios.get(URL);
  // Định dạng lại dữ liệu để dễ sử dụng trong DataTable
  const flights = data.map((item) => ({
    id: item.id,
    flightNumber: item.flightNumber,
    planeCode: item.planeCode,
    departure: item.departure,
    destination: item.destination,
    departureTime: dayjs(item.departureTime).format("YYYY-MM-DD HH:mm:ss"),
    arrivalTime: dayjs(item.arrivalTime).format("YYYY-MM-DD HH:mm:ss"),
    status: item.status,
  }));

  return flights;
};

const fetchFlightByIdAPI = async (id) => {
  const URL = `/api/users/flights/${id}`;
  const data = await axios.get(URL);
  const res = {
    id: data.id,
    flightNumber: data.flightNumber,
    planeCode: data.planeCode,
    departure: data.departure,
    destination: data.destination,
    departureTime: dayjs(data.departureTime),
    arrivalTime: dayjs(data.arrivalTime),
    status: data.status,
  };
  return res;
};

const createFlightAPI = async ({
  flightNumber,
  planeCode,
  departure,
  destination,
  departureTime,
  arrivalTime,
  status,
}) => {
  const URL = "/api/users/flights"; // Endpoint for creating a flight
  const data = {
    flightCode: flightNumber,
    planeCode,
    departure,
    destination,
    departureTime,
    arrivalTime,
    status,
  };

  return axios.post(URL, data); // Return the promise from axios.post
};

const updateFlightAPI = async ({
  id,
  flightNumber,
  planeCode,
  departure,
  destination,
  departureTime,
  arrivalTime,
  status,
}) => {
  const URL = `/api/users/flights/${id}`;
  const data = {
    flightCode: flightNumber,
    planeCode,
    departure,
    destination,
    departureTime,
    arrivalTime,
    status,
  };
  const res = await axios.put(URL, data);
  return res;
};

const deleteFlightAPI = async (id) => {
  const URL = `/api/users/flights/${id}`; // Đường dẫn API xóa chuyến bay
  return axios.delete(URL);
};

export {
  fetchFlightsAPI,
  fetchFlightByIdAPI,
  createFlightAPI,
  updateFlightAPI,
  deleteFlightAPI,
};
