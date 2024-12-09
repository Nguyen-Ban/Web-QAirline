import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParams to get the id from the URL
import { fetchPostByIdAPI, updatePostAPI } from "../../services/API/Posts"; // Assuming you have APIs to get and update posts
import PostForm from "./PostForm"; // Reuse PostForm for editing
import { notification } from "antd";

const EditPostForm = () => {
  const [postData, setPostData] = useState(null); // State to store fetched post data
  const { id } = useParams();
  console.log(id); // Get the post ID from URL parameters
  const navigate = useNavigate(); // To navigate back after successful update

  // Fetch the post data by id
  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const res = await fetchPostByIdAPI(id); // API call to fetch the post by id
      if (res) {
        console.log(res);
        setPostData(res); // Set the post data to state
      } else {
        console.error("Post not found.");
      }
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  // Handle form submission for updating the post
  const onFinish = async (values) => {
    try {
      values.id = id;
      const res = await updatePostAPI(values); // Call API to update the post

      Notification("success", "Update Post Successfully!");

      navigate("/posts"); // Redirect to posts list or post details page
    } catch (error) {
      console.error("Error updating post:", error);
      Notification("error", "Failed to Update Post");
    }
  };

  const Notification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  if (!postData) {
    return <div>Loading...</div>; // Show loading indicator until post data is fetched
  }

  return (
    <PostForm
      onFinish={onFinish} // Pass the form submission handler
      initialValues={postData} // Set the fetched post data as initial values for editing
      submitText="Update Post" // Change the button text for updating post
    />
  );
};

export default EditPostForm;
