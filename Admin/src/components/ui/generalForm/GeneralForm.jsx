import React, { useState } from "react";
import { Form, Input, Select, Button, Checkbox, Radio } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import "./GeneralForm.css";
import "./tinymce.css";

const { TextArea } = Input;
const { Option } = Select;

const GeneralForm = ({
  fields,
  onFinish,
  initialValues,
  submitText = "Submit",
  layout = "horizontal",
  onFieldChange,
}) => {
  const [editorValue, setEditorValue] = useState("");
  const [form] = Form.useForm();

  const handleEditorChange = (content) => {
    setEditorValue(content);
    onFieldChange?.(content, "editor"); // Send editor change to onFieldChange
  };

  const handleInputChange = (value, name) => {
    onFieldChange?.(value, name); // Pass value and field name to parent
  };

  return (
    <div>
      <Form
        form={form}
        layout={layout}
        onFinish={onFinish}
        initialValues={initialValues}
        className={`general-form ${
          layout === "horizontal" ? "horizontal-form" : ""
        }`}
      >
        {fields.map(
          ({ name, label, type, rules, options, placeholder, ...rest }) => {
            const commonProps = { name, label, rules };

            switch (type) {
              case "text":
                return (
                  <Form.Item key={name} {...commonProps} labelAlign="left">
                    <Input
                      placeholder={placeholder}
                      onChange={(e) => handleInputChange(e.target.value, name)}
                      {...rest}
                    />
                  </Form.Item>
                );
              case "number":
                return (
                  <Form.Item key={name} {...commonProps} labelAlign="left">
                    <Input
                      type="number"
                      placeholder={placeholder}
                      onChange={(e) => handleInputChange(e.target.value, name)}
                      {...rest}
                    />
                  </Form.Item>
                );
              case "select":
                return (
                  <Form.Item key={name} {...commonProps} labelAlign="left">
                    <Select
                      placeholder={placeholder}
                      onChange={(value) => handleInputChange(value, name)}
                      {...rest}
                    >
                      {options?.map((option) => (
                        <Option key={option.value} value={option.value}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                );
              case "editor":
                return (
                  <Form.Item key={name} {...commonProps} labelAlign="left">
                    <Editor
                      apiKey="your-tinymce-api-key" // Add your API key if needed
                      value={editorValue}
                      init={{
                        height: 200,
                        menubar: false,
                      }}
                      onEditorChange={handleEditorChange}
                    />
                  </Form.Item>
                );
              case "textarea":
                return (
                  <Form.Item key={name} {...commonProps} labelAlign="left">
                    <TextArea
                      placeholder={placeholder}
                      onChange={(e) => handleInputChange(e.target.value, name)}
                      {...rest}
                    />
                  </Form.Item>
                );
              default:
                return null;
            }
          }
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" className="custom-button">
            {submitText}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GeneralForm;
