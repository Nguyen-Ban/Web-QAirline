import axios from "./axios.customize.js";

const fetchPostsAPI = () => {
  const URL = "/posts";
  return axios.get(URL);
};
const fetchPlanesAPI = () => {
  const URL = "/planes";
  return axios.get(URL);
};
const fetchFlightsAPI = () => {
  const URL = "/flights";
  return axios.get(URL);
};
const fetchPassengersAPI = () => {
  const URL = "/passengers";
  return axios.get(URL);
};

export { fetchPostsAPI, fetchPlanesAPI, fetchFlightsAPI, fetchPassengersAPI };
