import axios from "./axios.customize.js";

const fetchPostsAPI = async () => {
  const URL = "/api/posts";
  const response = await axios.get(URL);
  const data = await response.data;
  console.log(data);
  const res = response.data.map((item) => ({
    id: item.postId,
    title: item.title,
    category: item.category,
    description: item.description,
    detail: item.detail,
  }));
  return res;
};

const fetchPostByIdAPI = async (id) => {
  const URL = `/api/posts/${id}`;
  const response = await axios.get(URL);
  const data = await response.data;
  const res = {
    id: data.postId,
    title: data.title,
    category: data.category,
    description: data.description,
    detail: data.detail,
  };
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

const updatePostAPI = async ({ id, title, category, description, detail }) => {
  const URL = `/api/posts/${id}`;
  const data = {
    title,
    category,
    description,
    detail,
  };
  return axios.put(URL, data);
};

const deletePostAPI = async (id) => {
  const URL = `/api/posts/${id}`;
  return axios.delete(URL);
};

const fetchPlanesAPI = async () => {
  const URL = "/api/planes";
  const response = await axios.get(URL);
  const data = await response.data;
  console.log(data);
  const res = response.data.map((item) => ({
    planeCode: item.planeCode,
    model: item.model,
    manufacturer: item.manufacturer,
    seatCapacity: item.seat_capacity,
  }));
  return res;
};

const fetchPlaneByCodeAPI = async (planeCode) => {
  const URL = `/api/planes/${planeCode}`;
  const response = await axios.get(URL);
  const data = await response.data;
  const res = {
    planeCode: data.planeCode,
    model: data.model,
    manufacturer: data.manufacturer,
    seatCapacity: data.seat_capacity,
  };
  return res;
};

const createPlaneAPI = async ({
  planeCode,
  model,
  manufacturer,
  seat_capacity,
}) => {
  const URL = "/api/planes";
  const data = {
    planeCode,
    model,
    manufacturer,
    seat_capacity,
  };
  return axios.post(URL, data);
};

const updatePlaneAPI = async ({
  planeCode,
  model,
  manufacturer,
  seat_capacity,
}) => {
  const URL = `/api/planes/${planeCode}`;
  const data = {
    model,
    manufacturer,
    seat_capacity,
  };
  return axios.put(URL, data);
};

const deletePlaneAPI = async (planeCode) => {
  const URL = `/api/planes/${planeCode}`;
  return axios.delete(URL);
};

const fetchFlightsAPI = async () => {
  const URL = "/api/flights"; // Địa chỉ API lấy thông tin chuyến bay
  const response = await axios.get(URL); // Gửi yêu cầu GET tới API
  const data = await response.data; // Lấy dữ liệu từ phản hồi

  // Chuyển dữ liệu thành dạng mong muốn
  const res = data.map((item) => ({
    flightCode: item.flightCode, // Mã chuyến bay
    planeCode: item.planeCode, // Mã máy bay
    departure: item.departure, // Nơi khởi hành
    destination: item.destination, // Điểm đến
    departureTime: item.departureTime, // Thời gian khởi hành
    arrivalTime: item.arrivalTime, // Thời gian đến
    flightStatus: item.flightStatus, // Trạng thái chuyến bay
  }));

  return res; // Trả về dữ liệu đã xử lý
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
  fetchPostByIdAPI,
  createPostAPI,
  updatePostAPI,
  deletePostAPI,
  fetchPlanesAPI,
  fetchPlaneByCodeAPI,
  createPlaneAPI,
  updatePlaneAPI,
  deletePlaneAPI,
  fetchFlightsAPI,
  fetchPassengersAPI,
  createFlightAPI,
  createPassengerAPI,
};
