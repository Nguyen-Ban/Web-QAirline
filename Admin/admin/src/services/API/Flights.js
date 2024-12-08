// FlightApi.js
import axios from "../axios.customize.js";

const fetchFlightsAPI = async () => {
  const URL = "/api/users/flights"; // Đường dẫn API cho flights
  const response = await axios.get(URL);
  const data = await response.data;

  // Định dạng lại dữ liệu để dễ sử dụng trong DataTable
  const flights = data.map((item) => ({
    id: item.id,
    flightNumber: item.flightNumber,
    departure: item.departure,
    destination: item.destination,
    departureTime: item.departureTime,
    arrivalTime: item.arrivalTime,
    status: item.status,
  }));
  console.log(flights);

  return flights;
};

const createFlightAPI = async ({
  flightNumber,
  departure,
  destination,
  departureTime,
  arrivalTime,
  status,
}) => {
  const URL = "/api/users/flights"; // Endpoint for creating a flight
  const data = {
    flightCode: flightNumber,
    departure,
    destination,
    departureTime,
    arrivalTime,
    status,
  };

  return axios.post(URL, data); // Return the promise from axios.post
};

const deleteFlightAPI = async (id) => {
  const URL = `/api/users/flights/${id}`; // Đường dẫn API xóa chuyến bay
  return axios.delete(URL);
};

export { fetchFlightsAPI, createFlightAPI, deleteFlightAPI };
