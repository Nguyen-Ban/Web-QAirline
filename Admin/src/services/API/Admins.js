import axios from "../axios.customize.js";

const fetchAdminsAPI = async () => {
  const URL = "/api/users/admins";
  const data = await axios.get(URL);
  const res = data.map((item) => ({
    id: item.id,
    username: item.username,
    email: item.email,
  }));
  return res;
};

const createAdminAPI = async ({ username, email, password, role }) => {
  const url = "/api/auth/register";
  const data = {
    username: username,
    email: email,
    password: password,
    role: role,
  };

  return axios.post(url, data);
};

export { fetchAdminsAPI, createAdminAPI };
