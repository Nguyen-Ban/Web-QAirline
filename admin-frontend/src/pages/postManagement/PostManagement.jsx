import { Link } from "react-router-dom";
import { IoAdd } from "react-icons/io5";

import PostTable from "../../components/postTable/PostTable";
import "./postManagement.css";

const PostManagement = () => {
  return (
    <div className="post-management">
      <div className="head-section">
        Post Details
        <Link to="/add-post">
          <div className="action">
            <button className="btn btn-main">
              <span>
                <IoAdd />
              </span>
              Add Post
            </button>
          </div>
        </Link>
      </div>
      <PostTable />
    </div>
  );
};

export default PostManagement;
