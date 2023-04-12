import axios from "axios";
import store from "../store";
export const getBatchOptions = (options = []) => {
  return function (dispatch) {
    const state = { ...store.getState().ReducerA };
    const result = {
      type: "getBatchOptions",
      state,
    };

    if (!Array.isArray(options)) {
      dispatch(result);
    }

    let isOptionsNull = false;
    if (state.dataOptions) {
      options.forEach((element) => {
        if (!state.dataOptions[element]) {
          isOptionsNull = true;
        }
      });
      if (!isOptionsNull) {
        dispatch(result);
      }
    }
    axios.get("http://localhost:1111/api/v1/audience/options").then((res) => {
      if (res.status === 200) {
        result.state.dataOptions = res.data;
        dispatch(result);
      } else {
        dispatch(result);
      }
    });
  };
};
