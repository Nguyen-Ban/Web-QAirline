import axios from "../axios.customize.js";

const fetchPostsAPI = async () => {
  const URL = "/api/users/posts";
  const data = await axios.get(URL);
  const res = data.map((item) => ({
    id: item.postId,
    title: item.title,
    category: item.category,
    description: item.description,
    detail: item.detail,
  }));
  return res;
};

const fetchPostByIdAPI = async (id) => {
  const URL = `/api/users/posts/${id}`;
  const data = await axios.get(URL);
  console.log("data >> ", data);
  const res = {
    id: data.postId,
    title: data.title,
    category: data.category,
    description: data.description,
    detail: data.detail,
  };
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
  const res = await axios.post(URL, data);
  return res;
};

const updatePostAPI = async ({ id, title, category, description, detail }) => {
  const URL = `/api/users/posts/${id}`;
  const data = {
    title,
    category,
    description,
    detail,
  };
  const res = await axios.put(URL, data);
  return res;
};

const deletePostAPI = async (id) => {
  const URL = `/api/users/posts/${id}`;
  const res = await axios.delete(URL);
  return res;
};

export {
  fetchPostsAPI,
  fetchPostByIdAPI,
  createPostAPI,
  updatePostAPI,
  deletePostAPI,
};
