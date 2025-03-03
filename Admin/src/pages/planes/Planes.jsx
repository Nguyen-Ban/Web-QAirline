import React from "react";
import PageHeader from "../../components/ui/pageHeader/PageHeader";
import PlaneTable from "../../components/planes/PlaneTable"; // Giả sử bạn đã tạo một bảng cho planes

const Planes = () => {
  return (
    <div className="planes">
      <PageHeader
        title="PLANES"
        buttonText="Add new"
        buttonLink="/planes/add"
      />
      <PlaneTable />
    </div>
  );
};

export default Planes;
