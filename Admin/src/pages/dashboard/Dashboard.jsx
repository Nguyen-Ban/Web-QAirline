import { TicketType } from "../../components/dashboard/TicketType";

import MostRoutes from "../../components/dashboard/MostRoutes/MostRoutes";
import SeatClass from "../../components/dashboard/SeatClass/SeatClass";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <TicketType />
      <SeatClass />
       <MostRoutes />
    </div>
  );
};

export default Dashboard;
