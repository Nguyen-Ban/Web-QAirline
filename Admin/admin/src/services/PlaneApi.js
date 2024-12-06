import axios from "./axios.customize.js";

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

export { fetchPlanesAPI };
