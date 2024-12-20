import { BookingStatus } from "../../components/dashboard/BookingStatus";

import MostRoutes from "../../components/dashboard/MostRoutes/MostRoutes";
import SeatClass from "../../components/dashboard/SeatClass/SeatClass";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <BookingStatus />
      <SeatClass />
       <MostRoutes />
    </div>
  );
};

export default Dashboard;
