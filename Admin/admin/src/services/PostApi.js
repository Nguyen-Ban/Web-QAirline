import axios from "./axios.customize.js";

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

export { fetchPostsAPI };
