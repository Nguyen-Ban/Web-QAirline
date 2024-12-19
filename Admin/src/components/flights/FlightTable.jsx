import React from "react";
import DataTable from "../ui/dataTable/DataTable";
import { fetchFlightsAPI, deleteFlightAPI } from "../../services/API/Flights"; // API lấy và xóa dữ liệu chuyến bay

const FlightTable = () => {
  const columns = [
    {
      title: "Flight Number",
      dataIndex: "flightNumber",
      key: "flightNumber", // Mã chuyến bay
    },
    {
      title: "Plane Code",
      dataIndex: "planeCode",
      key: "planeCode", // Mã chuyến bay
    },
    {
      title: "Departure",
      dataIndex: "departure",
      key: "departure", // Nơi đi
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination", // Nơi đến
    },
    {
      title: "Departure Time",
      dataIndex: "departureTime",
      key: "departureTime", // Thời gian khởi hành
      render: (text) => new Date(text).toLocaleString(), // Format the booking time
    },
    {
      title: "Arrival Time",
      dataIndex: "arrivalTime",
      key: "arrivalTime", // Thời gian đến
      render: (text) => new Date(text).toLocaleString(), // Format the booking time
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status", // Trạng thái chuyến bay
      render: (status) => {
        // Map trạng thái thành giá trị hiển thị
        const statusMapping = {
          scheduled: "Scheduled",
          delayed: "Delayed",
          cancelled: "Cancelled",
          onair: "On Air",
          completed: "Completed",
        };
        console.log("status >>>: ", status);
        return statusMapping[status] || "Unknown"; // Hiển thị giá trị tương ứng hoặc "Unknown" nếu không khớp
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      apiData={fetchFlightsAPI} // Truyền API lấy dữ liệu chuyến bay
      onDelete={deleteFlightAPI} // Truyền API xóa chuyến bay
      editUrl="/flights/edit" // URL chỉnh sửa chuyến bay
    />
  );
};

export default FlightTable;
