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
      title: "First Class",
      dataIndex: "firstClass",
      key: "firstClass",
      render: (firstClass) => (
        <span style={{ fontSize: "18px" }}>{firstClass ? "✓" : "×"}</span>
      ),
    },
    {
      title: "Business Class",
      dataIndex: "businessClass",
      key: "businessClass",
      render: (businessClass) => (
        <span style={{ fontSize: "18px" }}>{businessClass ? "✓" : "×"}</span>
      ),
    },
    {
      title: "Economy Class",
      dataIndex: "economyClass",
      key: "economyClass",
      render: (economyClass) => (
        <span style={{ fontSize: "18px" }}>{economyClass ? "✓" : "×"}</span>
      ),
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
