import { Button } from "antd";
import NewsPublish from "../../components/publish-manage/NewsPublish";
import usePublish from "../../components/publish-manage/usePublish";

export default function Sunset(props) {
  const { dataSource, handleDelete } = usePublish(3);

  return (
    <NewsPublish
      dataSource={dataSource}
      button={(item) => {
        return <Button danger onClick={()=>handleDelete(item)}>删除</Button>;
      }}
    ></NewsPublish>
  );
}
