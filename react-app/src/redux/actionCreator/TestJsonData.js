import axios from "axios";
import { fromJS } from "immutable";
import { store } from "../store";
export const getTestJsonData = async () => {
  const state = fromJS(store.getState());
  const result = {
    type: "getTestJsonData",
    state: store.getState(),
  };
  const resData = await axios.get("/test.json");
  if (resData.status === 200) {
    result.state = state.set("testJsonData", resData.data).toJS();
    return result;
  }
  return result;
};
