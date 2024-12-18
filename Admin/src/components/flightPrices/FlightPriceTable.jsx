import React from "react";
import DataTable from "../ui/dataTable/DataTable";
import {
  fetchFlightPricesAPI,
  deleteFlightPriceAPI,
} from "../../services/API/FlightPrices";

const FlightPriceTable = () => {
  const columns = [
    {
      title: "Flight Number",
      dataIndex: "flightNumber",
      key: "flightNumber",
    },

    {
      title: "First Price",
      dataIndex: "firstPrice",
      key: "firstPrice",
      render: (price) => `$${price}`, // Hiển thị giá tiền với ký hiệu $
    },
    {
      title: "Business Price",
      dataIndex: "businessPrice",
      key: "businessPrice",
      render: (price) => `$${price}`,
    },
    {
      title: "Economy Price",
      dataIndex: "economyPrice",
      key: "economyPrice",
      render: (price) => `$${price}`,
    },
  ];

  return (
    <DataTable
      columns={columns}
      apiData={fetchFlightPricesAPI} // API lấy dữ liệu flight config
      onDelete={deleteFlightPriceAPI} // API xóa flight config
      editUrl="/flight-prices/edit" // URL chỉnh sửa flight config
    />
  );
};

export default FlightPriceTable;
