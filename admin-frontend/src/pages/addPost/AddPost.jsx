import AddPostForm from "../../components/addPostForm/AddPostForm";
import "./addPost.css";

const AddPost = () => {
  return (
    <div className="add-post">
      <div className="head-section">Add Post</div>
      <AddPostForm />
    </div>
  );
};

export default AddPost;
