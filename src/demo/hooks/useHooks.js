import React, { useState } from "react";
import ControlledField from "../通信/ControlledField";
import ListItemFunc from "../通信/ListItemFunc";

export default function UseHooks() {
  const [list, setList] = useState([
    {
      id: "test1",
      text: "test1",
      checked: false,
    },
    {
      id: "test2",
      text: "test2",
      checked: true,
    },
    { id: "test3", text: "test3", checked: false },
  ]);
  const [keyword, setKeyword] = useState("");
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
    newList.push({
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
    </div>
  );
}
