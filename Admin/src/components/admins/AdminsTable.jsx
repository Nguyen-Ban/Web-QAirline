import React from "react";
import DataTable from "../ui/dataTable/DataTable";
import { fetchAdminsAPI } from "../../services/API/Admins";

const AdminTable = () => {
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <DataTable
      columns={columns}
      apiData={fetchAdminsAPI}
      editUrl="#"
      hideActions={true}
    />
  );
};

export default AdminTable;
