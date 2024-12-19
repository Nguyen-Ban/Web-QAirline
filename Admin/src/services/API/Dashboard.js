import axios from "../axios.customize.js";

const fetchTicketTypeAPI = async () => {
  // const URL = "/api/users/statistics";
  // const data = await axios.get(URL);

  const ticketType = {
    total: 120,
    oneWay: 80,
    roundTrip: 40,
  };

  return ticketType;
};

const fetchSeatClassAPI = async () => {
  // const URL = "/api/users/statistics";
  // const data = await axios.get(URL);

  const seatClass = {
    first: 120,
    business: 300,
    economy: 580,
  };

  return seatClass;
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
