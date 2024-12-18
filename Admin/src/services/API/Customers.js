import axios from "../axios.customize.js";
import dayjs from "dayjs";

// API để lấy danh sách khách hàng
const fetchCustomersAPI = async () => {
  const URL = "/api/users/customers"; // Endpoint lấy danh sách khách hàng
  try {
    const data = await axios.get(URL);

    // Định dạng lại dữ liệu theo đúng yêu cầu
    const res = data.map((item) => ({
      username: item.username, // Tên khách hàng
      email: item.email, // Email khách hàng
      flightNumber: item.flightNumber, // Mã chuyến bay
      seatNumber: item.seatNumber, // Số ghế
      bookingTime: dayjs(item.bookingTime).format("YYYY-MM-DD HH:mm:ss"), // Định dạng lại thời gian đặt vé
      bookingStatus: item.bookingStatus, // Trạng thái booking
    }));

    return res;
  } catch (error) {
    console.error("Error fetching flight customers:", error);
    return [];
  }
};

export { fetchCustomersAPI };
