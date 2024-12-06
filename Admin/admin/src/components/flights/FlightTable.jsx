import React from "react";
import DataTable from "../ui/dataTable/DataTable";
import { fetchFlightsAPI } from "../../services/api.service"; // Import API cho flights

const FlightTable = () => {
  const columns = [
    { header: "#", field: null, render: (_, __, index) => index + 1 },
    { header: "Flight Code", field: "flightCode" }, // Cột "Flight Code"
    { header: "Plane Code", field: "planeCode" }, // Cột "Plane Code"
    { header: "Departure", field: "departure" }, // Cột "Departure"
    { header: "Destination", field: "destination" }, // Cột "Destination"
    { header: "Departure Time", field: "departureTime" }, // Cột "Departure Time"
    { header: "Arrival Time", field: "arrivalTime" }, // Cột "Arrival Time"
    { header: "Flight Status", field: "flightStatus" }, // Cột "Flight Status"
  ];

  return (
    <DataTable
      columns={columns}
      fetchData={fetchFlightsAPI} // Gọi API lấy dữ liệu chuyến bay
      //   onDelete={deleteFlightAPI} // Gọi API xóa chuyến bay
      editUrl="/edit-flight" // Đường dẫn sửa chuyến bay
    />
  );
};

export default FlightTable;
