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

const createPostAPI = async ({ title, category, description, detail }) => {
  const URL = "api/posts";
  const data = {
    title,
    category,
    description,
    detail,
  };
  return axios.post(URL, data);
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

const createAirplaneAPI = async ({
  airplaneCode,
  model,
  manufacturer,
  capacity,
}) => {
  const URL = "api/airplanes";
  const data = {
    airplaneCode,
    model,
    manufacturer,
    capacity,
  };
  return axios.post(URL, data);
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

const createFlightAPI = async ({
  flightCode,
  airplaneCode,
  source,
  destination,
  departureTime,
  arrivalTime,
}) => {
  const URL = "api/flights";
  const data = {
    flightCode,
    airplaneCode,
    source,
    destination,
    departureTime,
    arrivalTime,
  };
  return axios.post(URL, data);
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

const createPassengerAPI = async ({ name, dob, gender, flight, contact }) => {
  const URL = "api/passengers";
  const data = {
    name,
    dob,
    gender,
    flight,
    contact,
  };
  return axios.post(URL, data);
};

export {
  fetchPostsAPI,
  fetchAirplanesAPI,
  fetchFlightsAPI,
  fetchPassengersAPI,
  createPostAPI,
  createAirplaneAPI,
  createFlightAPI,
  createPassengerAPI,
};
