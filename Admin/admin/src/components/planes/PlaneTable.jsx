import React from "react";
import DataTable from "../ui/dataTable/DataTable";
import { fetchPlanesAPI } from "../../services/PlaneApi.js"; 

const PlaneTable = () => {
  const columns = [
    { header: "#", field: null, render: (_, __, index) => index + 1 },
    { header: "Plane Code", field: "planeCode" }, // Cột "Plane Code"
    { header: "Model", field: "model" }, // Cột "Model"
    { header: "Manufacturer", field: "manufacturer" }, // Cột "Manufacturer"
    { header: "Seat Capacity", field: "seatCapacity" }, // Cột "Seat Capacity"
  ];

  return (
    <DataTable
      columns={columns}
      fetchData={fetchPlanesAPI} // Gọi API lấy dữ liệu máy bay
      onDelete={deletePlaneAPI} // Gọi API xóa máy bay
      editUrl="/edit-plane" // Đường dẫn sửa máy bay
    />
  );
};

export default PlaneTable;
