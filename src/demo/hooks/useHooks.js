import React, { useEffect, useState } from "react";
import ControlledField from "../通信/ControlledField";
import ListItemFunc from "../通信/ListItemFunc";
import "../../asset/index.css";
import axios from "axios";

function Child(props) {
  const [categoryData, setCategoryData] = useState("");

  useEffect(() => {
    axios.get("/test.json").then((res) => {
      if (props.category === 1) {
        setCategoryData(res?.data?.category_1 || "");
      } else {
        setCategoryData(res?.data?.category_2 || "");
      }
    });
  }, [props.category]);
  return <div>测试getDerivedStateFromProps: {categoryData}</div>;
}

export default function UseHooks() {
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState(1);

  useEffect(() => {
    axios.get("/test.json").then((res) => {
      setList(res?.data?.list || []);
    });
  }, []);

  const checkHandler = (index) => {
    const newList = [...list];
    newList[index].checked = !newList[index].checked;
    setList(newList);
  };
  const addItemHandler = () => {
    if (!keyword.trim()) {
      alert("请输入有效信息！");
      return;
    }
    let newList = [...list];
    newList.unshift({
      id: Math.random() * 1000000,
      text: keyword,
      checked: false,
    });
    setList(newList);
    setKeyword("");
  };
  const deleteHandler = (index) => {
    let newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };
  return (
    <div>
      <section>
        <h1 className="text-center">useState()应用</h1>
        <ControlledField
          type="text"
          value={keyword}
          onChange={(value) => {
            setKeyword(value);
          }}
        />
        <button onClick={() => addItemHandler()}>添加</button>
        <ListItemFunc
          list={list || []}
          checkHandler={(index) => checkHandler(index)}
          deleteHandler={(index) => deleteHandler(index)}
        />
      </section>
      <section>
        <h1 className="text-center">useEffect()应用</h1>
        <ul className="tabs">
          <li className="tab-item" onClick={() => setCategory(1)}>
            分类一
          </li>
          <li className="tab-item" onClick={() => setCategory(2)}>
            分类二
          </li>
        </ul>
        {<Child category={category} />}
      </section>
    </div>
  );
}
