import FlightTable from "../../components/flights/FlightTable"; // Import FlightTable
import PageHeader from "../../components/ui/pageHeader/PageHeader"; // Import PageHeader

const Flights = () => {
  return (
    <div className="flights">
      <PageHeader
        title="FLIGHTS"
        buttonText="Add new"
        buttonLink="/flights/add"
      />{" "}
      {/* Cập nhật link thêm chuyến bay */}
      <FlightTable /> {/* Thay PostTable bằng FlightTable */}
    </div>
  );
};

export default Flights;
