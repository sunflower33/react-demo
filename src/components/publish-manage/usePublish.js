import { notification } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

function usePublish(publishState = 1) {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const { username } = JSON.parse(localStorage.getItem("token"));
    axios
      .get(
        `/news?publishState=${publishState}&author=${username}&_expand=category`
      )
      .then((response) => {
        const list = response.data;
        setDataSource(list);
      });
  }, [publishState]);
  const handleDelete = (item) => {
    axios.delete(`/news/${item.id}`).then(() => {
      setDataSource(dataSource.filter((data) => data.id !== item.id));
      notification.info({
        message: "通知",
        description: `新闻已下线`,
        placement: "topRight",
      });
    });
  };
  const handlePublish = (item) => {
    axios
      .patch(`/news/${item.id}`, {
        publishState: 2,
      })
      .then(() => {
        setDataSource(dataSource.filter((data) => data.id !== item.id));
        notification.info({
          message: "通知",
          description: `您可以到【发布管理/已发布】中查看您的新闻`,
          placement: "topRight",
        });
      });
  };
  const handleSunset = (item) => {
    axios
      .patch(`/news/${item.id}`, {
        publishState: 3,
      })
      .then(() => {
        setDataSource(dataSource.filter((data) => data.id !== item.id));
        notification.info({
          message: "通知",
          description: `您可以到【发布管理/已下线】中查看您的新闻`,
          placement: "topRight",
        });
      });
  };
  return {
    dataSource,
    handleDelete,
    handlePublish,
    handleSunset,
  };
}
export default usePublish;
