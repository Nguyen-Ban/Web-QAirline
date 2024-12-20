import axios from "../axios.customize.js";

const fetchTicketTypeAPI = async () => {
  const URL = "/api/users/reservation-overview";
  const data = await axios.get(URL);


  return data;
};

const fetchSeatClassAPI = async () => {
  const URL = "/api/users/class-overview";
  const data = await axios.get(URL);


  return data;
};

const fetchMostRoutesAPI = async () => {
  // const URL = "/api/users/statistics";
  // const data = await axios.get(URL);

  const mostRoutes = [
    { route: "Ho Chi Minh City - Hanoi", bookings: 25 },
    { route: "Ho Chi Minh City - Da Nang", bookings: 18 },
    { route: "Hanoi - Da Nang", bookings: 15 },
    { route: "Ho Chi Minh City - Phu Quoc", bookings: 20 },
    { route: "Hanoi - Phu Quoc", bookings: 12 },
    { route: "Da Nang - Phu Quoc", bookings: 9 },
    { route: "Ho Chi Minh City - Hai Phong", bookings: 16 },
    { route: "Hanoi - Hue", bookings: 8 },
    { route: "Hue - Da Lat", bookings: 7 },
    { route: "Can Tho - Da Nang", bookings: 11 },
  ];

  return mostRoutes;
};

export { fetchTicketTypeAPI, fetchSeatClassAPI, fetchMostRoutesAPI };
