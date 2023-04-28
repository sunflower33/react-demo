import { Button } from "antd";
import NewsPublish from "../../components/publish-manage/NewsPublish";
import usePublish from "../../components/publish-manage/usePublish";

export default function Unpublished(props) {
  const { dataSource, handlePublish } = usePublish(1);

  return (
    <NewsPublish
      dataSource={dataSource}
      button={(item) => {
        return (
          <Button type="primary" onClick={() => handlePublish(item)}>
            发布
          </Button>
        );
      }}
    ></NewsPublish>
  );
}
