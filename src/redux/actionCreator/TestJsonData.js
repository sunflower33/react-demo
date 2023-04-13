import axios from "axios";
import {store} from "../store";
export const getTestJsonData = async () => {
  const state = { ...store.getState().ReducerTest };
  const result = {
    type: "getTestJsonData",
    state,
  };
  const resData = await axios.get("/test.json");
  console.log(resData);
  if (resData.status === 200) {
    result.state.testJsonData = resData.data;
    return result;
  }
  return result;
};
