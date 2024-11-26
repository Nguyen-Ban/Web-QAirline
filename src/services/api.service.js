import axios from "./axios.customize.js";

const fetchPostsAPI = async () => {
  const URL = "/api/posts";
  const response = await axios.get(URL);
  const res = response.data.map((item) => ({
    title: item.title,
    category: item.category,
    description: item.description,
    detail: item.detail,
  }));
  return res;
};

const fetchAirplanesAPI = async () => {
  const URL = "/api/airplanes";
  const response = await axios.get(URL);
  const res = response.data.map((item) => ({
    airplaneCode: item.airplaneCode,
    model: item.model,
    manufacturer: item.manufacturer,
    capacity: item.capacity,
  }));
  return res;
};

const fetchFlightsAPI = async () => {
  const URL = "/api/flights";
  const response = await axios.get(URL);
  const res = response.data.map((item) => ({
    flightCode: item.flightCode,
    airplaneCode: item.airplaneCode,
    source: item.source,
    destination: item.destination,
    departureTime: item.departureTime,
    arrivalTime: item.arrivalTime,
    flightStatus: item.flightStatus,
  }));
  return res;
};

const fetchPassengersAPI = async () => {
  const URL = "/api/passengers";
  const response = await axios.get(URL);
  const res = response.data.map((item) => ({
    name: item.name,
    dob: item.dob,
    gender: item.gender,
    flight: item.flight,
    contact: item.contact,
  }));
  return res;
};

export {
  fetchPostsAPI,
  fetchAirplanesAPI,
  fetchFlightsAPI,
  fetchPassengersAPI,
};
