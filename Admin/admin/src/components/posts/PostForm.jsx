import React from "react";
import GeneralForm from "../ui/generalForm/GeneralForm";
import { createPostAPI } from "../../services/API/Posts";
import "./PostForm.css";

const PostForm = () => {
  const formFields = [
    {
      name: "title",
      label: "Title",
      type: "text",
      rules: [{ required: true, message: "Please enter the title!" }],
      placeholder: "Enter the post title",
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      rules: [{ required: true, message: "Please select a category!" }],
      placeholder: "Select a category",
      options: [
        { value: "introduction", label: "Introduction" },
        { value: "promotion", label: "Promotion" },
        { value: "notification", label: "Notification" },
        { value: "news", label: "News" },
      ],
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      rules: [{ required: true, message: "Please enter the description!" }],
      placeholder: "Write a brief description",
    },
    {
      name: "detail",
      label: "Detail",
      type: "textarea",
      rules: [{ required: true, message: "Please provide the details!" }],
    },
  ];

  const onFinish = async (values) => {
    console.log("Form Values:", values);
    const res = await createPostAPI(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Form Failed:", errorInfo);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create a Post</h2>
      <GeneralForm
        fields={formFields}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        submitText="Publish Post"
      />
    </div>
  );
};

export default PostForm;
