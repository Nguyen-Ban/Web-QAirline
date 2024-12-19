import React from "react";
import { createPostAPI } from "../../services/API/Posts"; // Post creation API
import PostForm from "./PostForm"; // Reuse PostForm for creating
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await createPostAPI(values); // Call API to create the post
      Notification("success", "Create Post Successfully!");

      navigate("/posts"); // Redirect to posts list or post details page
    } catch (error) {
      console.error("Error creating post:", error);
      Notification("error", "Failed to create Post");
    }
  };

  const Notification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  return (
    <PostForm
      onFinish={onFinish} // Pass the form submission handler
      submitText="Publish Post" // Button text for creating post
    />
  );
};

export default AddPostForm;
