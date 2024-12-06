import React from "react";
import GeneralForm from "../ui/generalForm/GeneralForm";

const PostForm = () => {
  const formFields = [
    {
      name: "title",
      label: "Title",
      type: "input",
      placeholder: "Enter post title",
      rules: [{ required: true, message: "Title is required" }],
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      placeholder: "Select category",
      options: [
        { label: "Technology", value: "tech" },
        { label: "Lifestyle", value: "lifestyle" },
        { label: "Education", value: "education" },
      ],
      rules: [{ required: true, message: "Category is required" }],
    },
    {
      name: "summary",
      label: "Summary",
      type: "textarea",
      placeholder: "Enter post summary",
      rules: [{ required: true, message: "Summary is required" }],
    },
    {
      name: "content",
      label: "Content",
      type: "rich-text", // Sử dụng TinyMCE làm editor
      rules: [{ required: true, message: "Content is required" }],
    },
    {
      name: "publishDate",
      label: "Publish Date",
      type: "datepicker",
      rules: [{ required: true, message: "Select a publish date" }],
    },
    {
      name: "agree",
      label: "I confirm all data is accurate",
      type: "checkbox",
      rules: [{ required: true, message: "Please agree before submitting" }],
    },
  ];

  const onFinish = (values) => {
    console.log("Form Values:", values);
    const { content } = values;
    console.log("HTML Content:", content); // Giá trị của nội dung được biên tập
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
