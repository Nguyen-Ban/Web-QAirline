import axios from "./axios.customize.js";

const fetchPostsAPI = () => {
  const URL = "/api/posts";
  return axios.get(URL);
};
const fetchPlanesAPI = () => {
  const URL = "/api/planes";
  return axios.get(URL);
};
const fetchFlightsAPI = () => {
  const URL = "/api/flights";
  return axios.get(URL);
};
const fetchPassengersAPI = () => {
  const URL = "/api/passengers";
  return axios.get(URL);
};

export { fetchPostsAPI, fetchPlanesAPI, fetchFlightsAPI, fetchPassengersAPI };
