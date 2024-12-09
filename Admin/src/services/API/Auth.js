import axios from "../axios.customize.js";

const LoginAPI = (email, password) => {
  console.log("Loginapi", email, password);
  const url = "/api/auth/login";
  const data = {
    email: email,
    password: password,
  };
  return axios.post(url, data);
};

export { LoginAPI };
