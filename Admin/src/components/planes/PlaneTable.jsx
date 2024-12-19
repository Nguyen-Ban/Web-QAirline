import React from "react";
import DataTable from "../ui/dataTable/DataTable";
import { fetchPlanesAPI, deletePlaneAPI } from "../../services/API/Planes"; // API lấy và xóa dữ liệu máy bay

const PlaneTable = () => {
  const columns = [
    {
      title: "Plane Code",
      dataIndex: "planeCode",
      key: "planeCode", // Mã máy bay
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model", // Mẫu máy bay
    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
      key: "manufacturer", // Nhà sản xuất máy bay
    },
    {
      title: "Seat Capacity",
      dataIndex: "seatCapacity",
      key: "seatCapacity", // Sức chứa ghế
    },
  ];

  return (
    <DataTable
      columns={columns}
      apiData={fetchPlanesAPI} // Truyền API lấy dữ liệu máy bay
      onDelete={deletePlaneAPI} // Truyền API xóa máy bay
      editUrl="/planes/edit" // URL chỉnh sửa máy bay
    />
  );
};

export default PlaneTable;
