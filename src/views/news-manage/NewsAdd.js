import { Button, Form, Input, Select, Space, Steps } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";

export default function NewsAdd() {
  const [currentStep, setCurrentStep] = useState(0);
  const [categoryList, setCategoryListp] = useState([]);
  const formLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  const newsForm = useRef(null);

  const handleNext = () => {
    if (currentStep === 0) {
      newsForm.current.validateFields().then(res=>{
        console.log(res)
      }).catch(error=>{
        console.log(error)
      })
    }
    setCurrentStep(currentStep + 1);
  };
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    axios.get("/categories").then((res) => {
      setCategoryListp(res.data);
    });
  }, []);
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <PageHeader title="撰写新闻"></PageHeader>
      <Steps
        current={currentStep}
        items={[
          {
            title: "基本信息",
            description: "新闻标题，新闻分类",
          },
          {
            title: "新闻内容",
            description: "新闻主体内容",
          },
          {
            title: "新闻提交",
            status: "保存草稿或者提交审核",
          },
        ]}
      />
      <section className={currentStep === 0 ? "show" : "hidden"}>
        <Form name="basic" ref={newsForm} {...formLayout}>
          <Form.Item
            label="新闻标题"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="新闻分类"
            name="category"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Select>
              {categoryList.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </section>
      <Space>
        {currentStep === 2 && (
          <>
            <Button>保存草稿</Button>
            <Button>提交审核</Button>
          </>
        )}
        {currentStep < 2 && (
          <Button type="primary" onClick={() => handleNext()}>
            下一步
          </Button>
        )}
        {currentStep > 0 && (
          <Button onClick={() => handlePrev()}>上一步</Button>
        )}
      </Space>
    </Space>
  );
}
