import { Button } from "antd";
import NewsPublish from "../../components/publish-manage/NewsPublish";
import usePublish from "../../components/publish-manage/usePublish";

export default function Published(props) {
  const { dataSource, handleSunset } = usePublish(2);

  return (
    <NewsPublish
      dataSource={dataSource}
      button={(item) => {
        return (
          <Button type="primary" danger onClick={() => handleSunset(item)}>
            下线
          </Button>
        );
      }}
    ></NewsPublish>
  );
}
