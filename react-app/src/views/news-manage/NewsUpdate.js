import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  notification,
  Select,
  Space,
  Steps,
} from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import NewsEditor from "../../components/news-manage/NewsEditor";

export default function NewsAdd(props) {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [categoryList, setCategoryList] = useState([]);

  const [formInfo, setFormInfo] = useState({});
  const [newsContent, setNewsContent] = useState("");

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
      newsForm.current
        .validateFields()
        .then((res) => {
          setFormInfo(res);
          setCurrentStep(currentStep + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      if (newsContent === "" || newsContent.trim === "<p></p>") {
        message.error("新闻内容不能为空");
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };
  const handleSave = (auditState) => {
    axios
      .patch(`/news/${props.match.params.id}`, {
        ...formInfo,
        content: newsContent,
        auditState,
      })
      .then((res) => {
        props.history.push(
          auditState === 0 ? "/news-manage/draft" : "/audit-manage/list"
        );
        notification.info({
          message: "通知",
          description: `您可以到${
            auditState === 0 ? "草稿箱" : "审核列表"
          }中查看您的新闻`,
          placement: "topRight",
        });
      });
  };

  useEffect(() => {
    axios.get("/categories").then((res) => {
      setCategoryList(res.data);
    });
  }, []);
  useEffect(() => {
    axios
      .get(`/news/${props.match.params.id}?_expand=role&_expand=category`)
      .then((res) => {
        const { title, categoryId, content } = res.data;
        form.setFieldsValue({ title, categoryId });
        setNewsContent(content);
      });
  }, [props.match.params.id, form]);
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <PageHeader
        left={<ArrowLeftOutlined onClick={() => props.history.goBack()} />}
        title="更新新闻"
      ></PageHeader>
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
        <Form form={form} ref={newsForm} {...formLayout}>
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
            name="categoryId"
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
      <section className={currentStep === 1 ? "show" : "hidden"}>
        <NewsEditor
          getContent={(content) => {
            setNewsContent(content);
          }}
          content={newsContent}
        ></NewsEditor>
      </section>
      <Space>
        {currentStep === 2 && (
          <>
            <Button onClick={() => handleSave(0)}>保存草稿</Button>
            <Button onClick={() => handleSave(1)}>提交审核</Button>
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
