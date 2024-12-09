import React from "react";
import GeneralForm from "../ui/generalForm/GeneralForm";
import { notification } from "antd"; // Notification from Ant Design

const PostForm = ({ onFinish, initialValues = {}, submitText }) => {
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

  return (
    <div style={{ padding: "20px" }}>
      <h2>{submitText}</h2>
      <GeneralForm
        fields={formFields}
        initialValues={initialValues} // Dynamically set initial values
        onFinish={onFinish} // Pass internal submission handler
        submitText={submitText}
      />
    </div>
  );
};

export default PostForm;
