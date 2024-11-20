import { Link } from "react-router-dom";
import "./postTable.css";

const PostTable = () => {
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
        <tbody></tbody>
      </table>
    </div>
  );
};

export default PostTable;
