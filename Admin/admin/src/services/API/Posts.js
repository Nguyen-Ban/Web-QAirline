import axios from "../axios.customize.js";

const fetchPostsAPI = async () => {
  const URL = "/api/users/posts";
  const response = await axios.get(URL);
  const data = await response.data;
  console.log(data);
  const res = response.data.map((item) => ({
    id: item.postId,
    title: item.title,
    category: item.category,
    description: item.description,
    detail: item.detail,
  }));
  return res;
};

const createPostAPI = async ({ title, category, description, detail }) => {
  const URL = "/api/users/posts";
  const data = {
    title,
    category,
    description,
    detail,
  };
  return axios.post(URL, data);
};

const deletePostAPI = async (id) => {
  const URL = `/api/users/posts/${id}`;
  return axios.delete(URL);
};

export { fetchPostsAPI, createPostAPI, deletePostAPI };
