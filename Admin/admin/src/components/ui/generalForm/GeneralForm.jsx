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
  submitText = "Submit",
  layout = "horizontal",
}) => {
  const [editorValue, setEditorValue] = useState("");
  const [form] = Form.useForm(); // Initialize form
  const apiKey = import.meta.env.VITE_TINYMCE_API_KEY;

  const handleEditorChange = (content) => {
    setEditorValue(content);
  };

  const onSubmit = (values) => {
    console.log("Form Values:", values);
    if (onFinish) {
      onFinish(values);
    }
  };

  return (
    <div>
      <Form
        form={form}
        layout={layout}
        onFinish={onSubmit}
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
                    <Input placeholder={placeholder} {...rest} />
                  </Form.Item>
                );
              case "number":
                return (
                  <Form.Item key={name} {...commonProps} labelAlign="left">
                    <Input
                      type="number"
                      placeholder={placeholder}
                      {...rest}
                      className="number-input"
                    />
                  </Form.Item>
                );
              case "textarea":
                return (
                  <Form.Item key={name} {...commonProps} labelAlign="left">
                    <TextArea placeholder={placeholder} {...rest} />
                  </Form.Item>
                );
              case "rich-text":
                return (
                  <Form.Item key={name} {...commonProps} labelAlign="left">
                    <Editor
                      apiKey={apiKey}
                      value={editorValue}
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: ["link", "image"],
                        toolbar:
                          "bold italic underline | alignleft aligncenter alignright | link image | numlist bullist | forecolor backcolor",
                      }}
                      onEditorChange={handleEditorChange}
                    />
                  </Form.Item>
                );
              case "select":
                return (
                  <Form.Item key={name} {...commonProps} labelAlign="left">
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
                  <Form.Item key={name} {...commonProps} labelAlign="left">
                    <DatePicker placeholder={placeholder} {...rest} />
                  </Form.Item>
                );
              case "checkbox":
                return (
                  <Form.Item key={name} {...commonProps} labelAlign="left">
                    <Checkbox {...rest}>{label}</Checkbox>
                  </Form.Item>
                );
              case "radio":
                return (
                  <Form.Item key={name} {...commonProps} labelAlign="left">
                    <Radio.Group {...rest}>
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
