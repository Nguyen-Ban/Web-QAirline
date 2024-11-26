import { Link } from "react-router-dom";
import "./postTable.css";
import { useEffect, useState } from "react";
import { fetchPostsAPI } from "../../services/api.service";

const PostTable = () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetchPostsAPI();
    console.log(res);
    setPostData(res);
  };
  return (
    <div className="post-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Description</th>
            <th className="action">Action</th>
          </tr>
        </thead>
        <tbody>
          {postData.map((item, index) => {
            return (
              <tr className="post-item">
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;
