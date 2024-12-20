import axios from "../axios.customize.js";

const fetchBookingStatusAPI = async () => {
  const URL = "/api/users/reservation-overview";
  const bookingStatuses = await axios.get(URL);


  return bookingStatuses;
};

const fetchSeatClassAPI = async () => {
  const URL = "/api/users/class-overview";
  const seatClasses = await axios.get(URL);


  return seatClasses;
};

const fetchMostRoutesAPI = async () => {
  const URL = "/api/users/route-overview";
  const mostRoutes = await axios.get(URL);

 
  return mostRoutes;
};

export { fetchBookingStatusAPI, fetchSeatClassAPI, fetchMostRoutesAPI };
