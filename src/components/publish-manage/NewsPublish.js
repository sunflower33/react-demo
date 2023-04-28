import { Table } from "antd";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

export default function NewsPublish(props) {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "新闻标题",
      dataIndex: "title",
      render: (title, item) => {
        return (
          <NavLink to={`/news-manage/preview/${item.id}`}>{title}</NavLink>
        );
      },
    },
    {
      title: "作者",
      dataIndex: "author",
    },
    {
      title: "新闻分类",
      dataIndex: "category",
      render: (category) => {
        return category.title;
      },
    },
    {
      title: "操作",
      render: (item) => {
        if(props.button) return props.button(item)
        return null
      },
    },
  ];

  return (
    <Table
      dataSource={props.dataSource}
      columns={columns}
      rowKey={(item) => item.id}
    ></Table>
  );
}
