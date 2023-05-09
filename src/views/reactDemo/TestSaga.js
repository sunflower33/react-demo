import { Button, Space } from "antd";
import React from "react";
import { store } from "../../redux/store";
import { connect } from "react-redux";

function TestSaga(props) {
  return (
    <Space>
      <Button
        onClick={() => {
          if (props.ReducerTestSaga.list1?.length) {
            console.log("这是缓存数据~~~~:", props.ReducerTestSaga.list1);
          } else {
          }
        }}
      >
        testSaga1
      </Button>
      <Button
        onClick={() => {
          if (props.ReducerTestSaga.list2?.length) {
            console.log("这是缓存数据~~2~~:", props.ReducerTestSaga.list2);
          } else {
            store.dispatch({ type: "get-list2" });
          }
        }}
      >
        testSaga2
      </Button>
      <Button onClick={() => store.dispatch({ type: "testTakeEvery1" })}>
        testTakeEvery1
      </Button>

      <Button onClick={() => store.dispatch({ type: "testTakeEvery2" })}>
        testTakeEvery2
      </Button>
    </Space>
  );
}
const mapStateToProps = (state) => {
  const { ReducerTestSaga } = state;
  return {
    ReducerTestSaga,
  };
};
export default connect(mapStateToProps)(TestSaga);
