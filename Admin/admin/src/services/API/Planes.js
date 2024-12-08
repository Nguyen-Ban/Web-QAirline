import axios from "../axios.customize.js";

const fetchPlanesAPI = async () => {
  const URL = "/api/users/planes"; // Đường dẫn API cho planes
  const response = await axios.get(URL);
  const data = await response.data;
  console.log(data);

  const res = data.map((item) => ({
    id: item.id,
    model: item.model,
    manufacturer: item.manufacturer,
    seatCapacity: item.seatCapacity,
    planeCode: item.planeCode,
  }));

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

const deletePlaneAPI = async (id) => {
  const URL = `/api/users/planes/${id}`;
  return axios.delete(URL);
};

export { fetchPlanesAPI, createPlaneAPI, deletePlaneAPI };
