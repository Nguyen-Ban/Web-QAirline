import axios from "axios";
import dayjs from "dayjs";

const fetchCustomersAPI = async () => {
  //   const URL = "/api/flights/customers"; // Endpoint lấy danh sách khách hàng
  //   try {
  //     const { data } = await axios.get(URL);
  //     const res = data.map((item) => ({
  //       id: item.customerId, // ID khách hàng
  //       name: item.name, // Tên khách hàng
  //       contact: item.contact, // Thông tin liên hệ (email hoặc số điện thoại)
  //       flightNumber: item.flightNumber, // Mã chuyến bay
  //       seatNumber: item.seatNumber, // Số ghế
  //       ticketClass: item.ticketClass, // Hạng vé
  //       bookingTime: item.bookingTime, // Thời gian đặt vé
  //     }));
  //     return res;
  //   } catch (error) {
  //     console.error("Error fetching flight customers:", error);
  //     return [];
  //   }
  return [
    {
      id: 1,
      name: "John Doe",
      contact: "+1234567890",
      flightNumber: "VN123",
      seatNumber: "12A",
      ticketClass: "Economy",
      bookingTime: dayjs("2024-12-01T08:00:00Z").format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      id: 2,
      name: "Jane Smith",
      contact: "jane.smith@example.com",
      flightNumber: "VN456",
      seatNumber: "14C",
      ticketClass: "Business",
      bookingTime: dayjs("2024-12-02T10:30:00Z").format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      id: 3,
      name: "Alice Brown",
      contact: "+9876543210",
      flightNumber: "VN789",
      seatNumber: "7B",
      ticketClass: "First Class",
      bookingTime: dayjs("2024-12-03T15:45:00Z").format("YYYY-MM-DD HH:mm:ss"),
    },
  ];
};

export { fetchCustomersAPI };
