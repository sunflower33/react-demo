import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import "./store/index";
import { Button, Descriptions, Space } from "antd";
import { setName } from "./store/stuSlice";
import { setName as setSchooleName } from "./store/schoolSlice";
import { useGetStudentsQuery  } from "./store/api/studentApi";

function App() {
  // useSelector()用于加载state中的数据
  const { student, school } = useSelector((state) => state);

  // 通过useDispatch()来获取派发器对象
  const dispatch = useDispatch();

  // 调用Api查询数据
  // 这个钩子函数会返回一个对象作为返回值，请求过程中相关数据
  useGetStudentsQuery();

  // 获取action的构建器

  const setNameHandler = () => {
    dispatch(setName());
    dispatch(setSchooleName("冬松小学"));
  };
  return (
    <Space direction="vertical">
      <Descriptions title="Student">
        <Descriptions.Item label="Name">{student.name}</Descriptions.Item>
        <Descriptions.Item label="Age">{student.age}</Descriptions.Item>
        <Descriptions.Item label="Gender">{student.gender}</Descriptions.Item>
        <Descriptions.Item label="Address">{student.address}</Descriptions.Item>
      </Descriptions>
      <Space align="center" direction="horizontal" style={{ width: "100%" }}>
        <Button type="primary" onClick={() => setNameHandler()}>
          修改内容
        </Button>
      </Space>
      <Descriptions title="School">
        <Descriptions.Item label="Name">{school.name}</Descriptions.Item>
        <Descriptions.Item label="Address">{school.address}</Descriptions.Item>
      </Descriptions>
    </Space>
  );
}

export default App;
