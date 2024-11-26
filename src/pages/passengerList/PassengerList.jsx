import PassengerTable from "../../components/PassengerTable/PassengerTable";
import "./passengerList.css";

const PassengerList = () => {
  return (
    <div className="passenger-list">
      <div className="head-section">Passenger Details</div>
      <PassengerTable />
    </div>
  );
};

export default PassengerList;
