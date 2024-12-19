import axios from "../axios.customize.js";

const fetchPlanesAPI = async () => {
  const URL = "/api/users/planes"; // Đường dẫn API cho planes
  const data = await axios.get(URL);

  const res = data.map((item) => ({
    id: item.id,
    planeCode: item.planeCode,
    model: item.model,
    manufacturer: item.manufacturer,
    seatCapacity: item.seatCapacity,
  }));

  return res;
};

const fetchPlaneCodesAPI = async () => {
  const URL = "/api/users/plane-codes"; // Đường dẫn API cho planes
  const data = await axios.get(URL);

  const res = data.map((item) => ({
    planeCode: item.planeCode,
  }));

  return res;
};

const fetchPlaneByIdAPI = async (id) => {
  const URL = `/api/users/planes/${id}`;
  const data = await axios.get(URL);
  console.log("data >> ", data);
  const res = {
    id: data.id,
    planeCode: data.planeCode,
    model: data.model,
    manufacturer: data.manufacturer,
    seatCapacity: data.seatCapacity,
  };
  return res;
};

const createPlaneAPI = async ({
  planeCode,
  model,
  manufacturer,
  seatCapacity,
}) => {
  const URL = "/api/users/planes"; // The API endpoint for creating a plane
  const data = {
    planeCode,
    model,
    manufacturer,
    seatCapacity,
  };

  return axios.post(URL, data); // Directly return the result of the axios post request
};

const updatePlaneAPI = async ({
  id,
  planeCode,
  model,
  manufacturer,
  seatCapacity,
}) => {
  const URL = `/api/users/planes/${id}`;
  const data = {
    planeCode,
    model,
    manufacturer,
    seatCapacity,
  };
  const res = await axios.put(URL, data);
  return res;
};

const deletePlaneAPI = async (id) => {
  const URL = `/api/users/planes/${id}`;
  return axios.delete(URL);
};

const fetchManufacturersAPI = async () => {
  const url = "/api/users/manufacturers";
  return axios.get(url);
};

const fetchModelsByManufacturerAPI = async (manufacturer) => {
  const url = `/api/users/models?manufacturer=${manufacturer}`;
  return axios.get(url);
};

export {
  fetchPlanesAPI,
  fetchPlaneCodesAPI,
  fetchPlaneByIdAPI,
  createPlaneAPI,
  updatePlaneAPI,
  deletePlaneAPI,
  fetchManufacturersAPI,
  fetchModelsByManufacturerAPI,
};
