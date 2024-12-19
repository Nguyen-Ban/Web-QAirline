import axios from "../axios.customize.js";

// Lấy tất cả giá vé của các chuyến bay
const fetchFlightPricesAPI = async () => {
  const URL = "/api/users/flight-prices";
  const data = await axios.get(URL);

  // Đổi tên các thuộc tính trước khi trả về
  const result = data.map((flight) => ({
    id: flight.flightId, // Đổi flightId thành id
    flightNumber: flight.flightNumber,
    firstPrice: flight.firstPrice, // Giữ nguyên tên
    businessPrice: flight.businessPrice, // Giữ nguyên tên
    economyPrice: flight.economyPrice, // Giữ nguyên tên
  }));

  return result;
};

// Lấy giá vé của một chuyến bay theo flightId
const fetchFlightPriceByIdAPI = async (flightId) => {
  const URL = `/api/users/flight-prices/${flightId}`;
  const data = await axios.get(URL);

  // Đổi tên các thuộc tính trước khi trả về
  const result = {
    id: data.flightId, // Đổi flightId thành id
    flightNumber: data.flightNumber,
    firstPrice: data.first,
    businessPrice: data.business,
    economyPrice: data.economy,
  };
  console.log("res>>", result);

  return result;
};

const fetchFlightsUnpricedAPI = async () => {
  const URL = `/api/users/flights-unpriced`;
  const data = await axios.get(URL);
  const result = data.map((flight) => ({
    flightNumber: flight.flightNumber,
  }));
  return result;
};
// Tạo mới giá vé cho một chuyến bay
const createFlightPriceAPI = async ({
  flightNumber,
  firstPrice,
  businessPrice,
  economyPrice,
}) => {
  const URL = "/api/users/flight-prices";
  const data = {
    flightNumber,
    firstPrice,
    businessPrice,
    economyPrice,
  };
  return axios.post(URL, data);
};

// Cập nhật giá vé của một chuyến bay
const updateFlightPriceAPI = async ({
  id,
  flightNumber,
  firstPrice,
  businessPrice,
  economyPrice,
}) => {
  const URL = `/api/users/flight-prices/${id}`;
  const data = {
    firstPrice,
    businessPrice,
    economyPrice,
  };
  const res = await axios.put(URL, data);

  // Đổi tên các thuộc tính trước khi trả về
  return {
    id: res.flightId, // Đổi flightId thành id
    firstPrice: res.firstPrice,
    businessPrice: res.businessPrice,
    economyPrice: res.economyPrice,
  };
};

// Xóa giá vé của một chuyến bay
const deleteFlightPriceAPI = async (id) => {
  const URL = `/api/users/flight-prices/${id}`;
  const res = await axios.delete(URL);

  // Trả về thông báo thành công khi xóa
  return {
    message: "Flight price deleted successfully",
  };
};

export {
  fetchFlightPricesAPI,
  fetchFlightPriceByIdAPI,
  fetchFlightsUnpricedAPI,
  createFlightPriceAPI,
  updateFlightPriceAPI,
  deleteFlightPriceAPI,
};
