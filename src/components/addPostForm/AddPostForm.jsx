import "./addPostForm.css";

const AddPostForm = () => {
  return (
    <div className="add-post-form">
      <form action="">
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input type="text" name="title" id="title" />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <br />
          <select name="category" id="category">
            <option value="introduction">Introduction</option>
            <option value="promotion">Promotion</option>
            <option value="announcement">Announcement</option>
            <option value="news">News</option>
          </select>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <br />
          <input type="text" name="description" id="description" />
        </div>
        <div>Detail</div>
        <div>
          <input
            className="save-and-post"
            type="submit"
            value="Save and Post"
          />
          <input className="discard" type="submit" value="Discard" />
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;
