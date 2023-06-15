import { configureStore } from "@reduxjs/toolkit";
import { stuReducer } from "./stuSlice";
import { schoolReducer } from "./schoolSlice";
import studentApi from "./api/studentApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

// configureStore创建store对象，需要一个配置对象作为参数
const store = configureStore({
  reducer: {
    student: stuReducer,
    school: schoolReducer,
    [studentApi.reducerPath]: studentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApi.middleware),
});

setupListeners(store.dispatch)

export default store;
