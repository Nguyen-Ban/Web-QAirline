import React, { useState } from "react";
import { Form, Input, Select, DatePicker, Button, Checkbox, Radio } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import "./GeneralForm.css";
import "./tinymce.css";
const { TextArea } = Input;
const { Option } = Select;

const GeneralForm = ({
  fields,
  onFinish,
  onFinishFailed,
  submitText = "Submit",
}) => {
  const [editorValue, setEditorValue] = useState(""); // Dữ liệu của editor

  // Lấy API Key từ .env
  const apiKey = import.meta.env.VITE_TINYMCE_API_KEY;

  // Cấu hình TinyMCE
  const handleEditorChange = (content, editor) => {
    setEditorValue(content); // Cập nhật giá trị editor khi thay đổi
  };

  const modules = {
    toolbar: [
      "bold italic underline | alignleft aligncenter alignright | link image | numlist bullist | forecolor backcolor",
    ],
    image_advtab: true, // Cho phép các tùy chọn nâng cao cho ảnh
    automatic_uploads: true,
    file_picker_types: "image", // Cho phép tải lên ảnh
  };

  return (
    <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      {fields.map((field) => {
        const { name, label, type, rules, options, placeholder, ...rest } =
          field;

        switch (type) {
          case "input":
            return (
              <Form.Item key={name} name={name} label={label} rules={rules}>
                <Input placeholder={placeholder} {...rest} />
              </Form.Item>
            );

          case "textarea":
            return (
              <Form.Item key={name} name={name} label={label} rules={rules}>
                <TextArea placeholder={placeholder} {...rest} />
              </Form.Item>
            );

          case "rich-text":
            return (
              <Form.Item key={name} name={name} label={label} rules={rules}>
                <Editor
                  apiKey={apiKey} // Cung cấp API Key ở đây
                  value={editorValue}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: ["image", "link"],
                    toolbar: modules.toolbar,
                    content_css: "/tinymce.css",
                    image_advtab: modules.image_advtab,
                    automatic_uploads: modules.automatic_uploads,
                    file_picker_types: modules.file_picker_types,
                    file_picker_callback: (callback, value, meta) => {
                      if (meta.filetype === "image") {
                        const input = document.createElement("input");
                        input.setAttribute("type", "file");
                        input.click();
                        input.onchange = () => {
                          const reader = new FileReader();
                          reader.onload = () => {
                            const base64 = reader.result;
                            callback(base64, { alt: input.files[0].name });
                          };
                          reader.readAsDataURL(input.files[0]);
                        };
                      }
                    },
                  }}
                  onEditorChange={handleEditorChange}
                />
              </Form.Item>
            );

          case "select":
            return (
              <Form.Item key={name} name={name} label={label} rules={rules}>
                <Select placeholder={placeholder} {...rest}>
                  {options.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            );

          case "datepicker":
            return (
              <Form.Item key={name} name={name} label={label} rules={rules}>
                <DatePicker {...rest} />
              </Form.Item>
            );

          case "checkbox":
            return (
              <Form.Item
                key={name}
                name={name}
                valuePropName="checked"
                rules={rules}
              >
                <Checkbox {...rest}>{label}</Checkbox>
              </Form.Item>
            );

          case "radio":
            return (
              <Form.Item key={name} name={name} label={label} rules={rules}>
                <Radio.Group>
                  {options.map((option) => (
                    <Radio key={option.value} value={option.value}>
                      {option.label}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            );

          default:
            return null;
        }
      })}

      <Form.Item>
        <Button type="primary" htmlType="submit" className="custom-button">
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GeneralForm;
