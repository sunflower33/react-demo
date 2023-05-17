import { getCinemaListService } from "../services/maizuo";

export default {
  namespace: "maizuo",
  state: {
    isShow: true,
  },
  reducers: {
    hide(prevState, action) {
      return { ...prevState, isShow: false };
    },
    show(prevState, action) {
      return { ...prevState, isShow: true };
    },
    changeCinemaList(prevState, {payload}){
      return {...prevState, list: payload}
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      console.log("subscriptions====", history);
    },
  },

  effects: {
    *getCinemaList(action, { call, put }) {
      const res = yield call(getCinemaListService)
      yield put({
        type: 'changeCinemaList',
        payload: res.data.films
      })
    },
  },
};
