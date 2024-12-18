import FlightPriceTable from "../../components/flightPrices/FlightPriceTable";
import PageHeader from "../../components/ui/pageHeader/PageHeader";

const FlightPrices = () => {
  return (
    <div className="flight-prices">
      <PageHeader
        title="Flight Prices"
        buttonText="Add new"
        buttonLink="/flight-prices/add"
      />

      <FlightPriceTable />
    </div>
  );
};

export default FlightPrices;
