import { useState } from "react";
import "./addPostForm.css";
import { createPostAPI } from "../../services/api.service";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");

  const [notification, setNotification] = useState("");

  const handleSubmitPost = async () => {
    const res = await createPostAPI({
      title,
      category,
      description,
      detail,
    });
    setNotification("Post Created Successfully");
  };

  return (
    <div className="add-post-form">
      <form>
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <br />
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=""></option>
            <option value="introduction">Introduction</option>
            <option value="promotion">Promotion</option>
            <option value="announcement">Announcement</option>
            <option value="news">News</option>
          </select>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <br />
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Detail</label>
          <br />
          <input
            type="text"
            name="detail"
            id="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>
        <div className="action">
          <div className="save-and-post" onClick={handleSubmitPost}>
            Save and Post
          </div>
          <div className="discard">Discard</div>
        </div>
      </form>
      <div className="notification">{notification}</div>
    </div>
  );
};

export default AddPostForm;
