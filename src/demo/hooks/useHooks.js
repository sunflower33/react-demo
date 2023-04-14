import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { Space } from "antd";
import "../../asset/index.css";
import Tabs from "../../components/Tabs";
import { getTestJsonData } from "../../redux/actionCreator/TestJsonData";
import ControlledField from "../通信/ControlledField";
import ListItemFunc from "../通信/ListItemFunc";
import UseContextDemo from "./useContextDemo";

function TestDestroyed() {
  useEffect(() => {
    window.onresize = () => {
      console.log("窗口有调整~~~~~~~~~~~~~~~");
    };
    var timer = setInterval(() => {
      console.log("定时器执行了~~~~~~~~~~~");
    }, 2000);
    return () => {
      window.onresize = null;
      clearInterval(timer);
    };
  }, []);
  return <div>测试清除定时器和销毁事件监听</div>;
}

function Child(props) {
  const [categoryData, setCategoryData] = useState("");
  useEffect(() => {
    axios.get("/test.json").then((res) => {
      if (props.match.params.id === "1") {
        setCategoryData(res?.data?.category_1 || "");
      } else {
        setCategoryData(res?.data?.category_2 || "");
      }
    });
  }, [props]);
  return <div>测试getDerivedStateFromProps: {categoryData}</div>;
}

// 自定义hooks
function useGetFilterList(list, keyword) {
  const filterList = useMemo(() => {
    return list.filter((item) => {
      return item.text.includes(keyword);
    });
  }, [list, keyword]);
  return filterList;
}

function UseHooks(props) {
  const history = useHistory();
  const [list, setList] = useState([]);
  const [newText, setNewText] = useState("");
  const [showTestDestroyed, setShowTestDestroyed] = useState(true);
  const [keyword, setKeyword] = useState("");

  const inputRef = useRef();
  const { ReducerTest, getTestJsonData } = props;
  useEffect(() => {
    if (!ReducerTest.testJsonData?.list) {
      getTestJsonData();
    } else {
      setList(ReducerTest?.testJsonData?.list || []);
    }
  }, [ReducerTest, getTestJsonData]);

  const checkHandler = useCallback(
    (index) => {
      const newList = [...list];
      newList[index].checked = !newList[index].checked;
      setList(newList);
    },
    [list]
  );
  const addItemHandler = useCallback(() => {
    if (!newText.trim()) {
      alert("请输入有效信息！");
      return;
    }
    let newList = [...list];
    newList.unshift({
      id: Math.random() * 1000000,
      text: newText,
      checked: false,
    });
    setList(newList);
    setNewText("");
  }, [newText, list]);
  const addItemByRef = useCallback(() => {
    if (!inputRef.current.value.trim()) {
      alert("请输入有效信息！");
      return;
    }
    let newList = [...list];
    newList.unshift({
      id: Math.random() * 1000000,
      text: inputRef.current.value,
      checked: false,
    });
    setList(newList);
    inputRef.current.value = "";
  }, [list]);
  const deleteHandler = useCallback(
    (index) => {
      let newList = [...list];
      newList.splice(index, 1);
      setList(newList);
    },
    [list]
  );

  const detailHandler = useCallback(
    (item, index) => {
      history.push(`/testParams/${item.id}`);
    },
    [history]
  );
  const filterList = useGetFilterList(list, keyword);
  return (
    <Space direction="vertical" size="large">
      <section>
        <h1 className="text-center">useState()应用</h1>

        <ul className="flex-row ">
          <li className="flex-row-item">
            <h3>useState</h3>

            <ControlledField
              type="text"
              value={newText}
              onChange={(value) => {
                setNewText(value);
              }}
            />
            <button onClick={() => addItemHandler()}>添加</button>
          </li>
          <li className="flex-row-item">
            <h3>useRef</h3>

            <input type="text" ref={inputRef} />
            <button onClick={() => addItemByRef()}>添加</button>
          </li>
          <li className="flex-row-item">
            <h3>useMemo</h3>
            搜索{" "}
            <ControlledField
              type="text"
              value={keyword}
              onChange={(value) => {
                setKeyword(value);
              }}
            />
          </li>
        </ul>
        <ListItemFunc
          list={filterList || []}
          checkHandler={(index) => checkHandler(index)}
          deleteHandler={(index) => deleteHandler(index)}
          detailHandler={(item, index) => detailHandler(item, index)}
        />
      </section>
      <section>
        <h1 className="text-center">useEffect()应用</h1>
        <Tabs
          data={[
            { title: "分类一", id: 1 },
            { title: "分类二", id: 2 },
          ]}
        />
        <Switch>
          <Route
            path="/hooksDemo/categoryList/:id"
            render={(props) => {
              return <Child {...props} />;
            }}
          ></Route>
          <Redirect to="/hooksDemo/categoryList"></Redirect>
        </Switch>
      </section>
      <section>
        <h1 className="text-center">useEffect()应用---销毁处理</h1>
        <button onClick={() => setShowTestDestroyed(!showTestDestroyed)}>
          {showTestDestroyed ? "隐藏" : "显示"}
        </button>
        {showTestDestroyed && <TestDestroyed />}
      </section>
      <section>
        <h1 className="text-center">useContext</h1>
        <UseContextDemo />
      </section>
    </Space>
  );
}

const mapStateToProps = (state) => {
  const { ReducerTest = {} } = state;
  return {
    ReducerTest,
  };
};
const mapDispatchToProps = {
  getTestJsonData,
};

export default connect(mapStateToProps, mapDispatchToProps)(UseHooks);
